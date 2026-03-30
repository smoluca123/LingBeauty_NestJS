import { Test, TestingModule } from '@nestjs/testing';
import { BlogTopicService } from './blog-topic.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StorageService } from 'src/modules/storage/storage.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';

describe('BlogTopicService', () => {
  let service: BlogTopicService;
  let prismaService: PrismaService;
  let storageService: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogTopicService,
        {
          provide: PrismaService,
          useValue: {
            blogTopic: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            blogPost: {
              count: jest.fn(),
            },
          },
        },
        {
          provide: StorageService,
          useValue: {
            uploadFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BlogTopicService>(BlogTopicService);
    prismaService = module.get<PrismaService>(PrismaService);
    storageService = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSubTopic', () => {
    it('should create a sub-topic with valid parentId', async () => {
      const parentId = 'parent-id';
      const createDto = {
        name: 'Sub Topic',
        description: 'Sub topic description',
      };

      const mockParent = {
        id: parentId,
        name: 'Parent Topic',
        slug: 'parent-topic',
        isDeleted: false,
      };

      const mockCreatedTopic = {
        id: 'sub-topic-id',
        name: 'Sub Topic',
        slug: 'sub-topic',
        description: 'Sub topic description',
        parentId,
        imageMediaId: null,
        isActive: true,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        imageMedia: null,
        children: [],
      };

      // Mock for createSubTopic parent validation
      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValueOnce(mockParent as any) // First call in createSubTopic
        .mockResolvedValueOnce(mockParent as any) // Second call in createTopic for parent validation
        .mockResolvedValueOnce(null); // For slug uniqueness check

      jest
        .spyOn(prismaService.blogTopic, 'create')
        .mockResolvedValue(mockCreatedTopic as any);

      const result = await service.createSubTopic(parentId, createDto);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Tạo chủ đề blog thành công');
      expect(result.data.name).toBe('Sub Topic');
      expect(result.data.parentId).toBe(parentId);
    });

    it('should throw error when parent topic not found', async () => {
      const parentId = 'non-existent-parent';
      const createDto = {
        name: 'Sub Topic',
      };

      jest.spyOn(prismaService.blogTopic, 'findFirst').mockResolvedValue(null);

      try {
        await service.createSubTopic(parentId, createDto);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessException);
        const response = (error as any).getResponse();
        expect(response.errorCode).toBe(ERROR_CODES.PARENT_TOPIC_NOT_FOUND);
      }
    });
  });

  describe('deleteTopic', () => {
    it('should prevent deletion when topic has children', async () => {
      const topicId = 'topic-with-children';

      const mockTopic = {
        id: topicId,
        name: 'Parent Topic',
        slug: 'parent-topic',
        isDeleted: false,
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);

      jest.spyOn(prismaService.blogTopic, 'count').mockResolvedValue(2); // Has 2 children

      try {
        await service.deleteTopic(topicId);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessException);
        const response = (error as any).getResponse();
        expect(response.errorCode).toBe(ERROR_CODES.DELETE_TOPIC_HAS_CHILDREN);
      }
    });
  });

  describe('getTopicBySlug', () => {
    it('should get topic by slug for public routes', async () => {
      const slug = 'beauty-tips';
      const mockTopic = {
        id: 'topic-id',
        name: 'Beauty Tips',
        slug,
        description: 'Tips for beauty',
        parentId: null,
        imageMediaId: null,
        isActive: true,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        imageMedia: null,
        children: [],
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);

      const result = await service.getTopicBySlug(slug);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Lấy thông tin chủ đề blog thành công');
      expect(result.data.slug).toBe(slug);
      expect(result.data.name).toBe('Beauty Tips');
      expect(prismaService.blogTopic.findFirst).toHaveBeenCalledWith({
        where: {
          isDeleted: false,
          slug,
          isActive: true,
        },
        select: expect.any(Object),
      });
    });

    it('should include post count when requested', async () => {
      const slug = 'beauty-tips';
      const mockTopic = {
        id: 'topic-id',
        name: 'Beauty Tips',
        slug,
        description: 'Tips for beauty',
        parentId: null,
        imageMediaId: null,
        isActive: true,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        imageMedia: null,
        children: [],
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);

      jest.spyOn(prismaService.blogPost, 'count').mockResolvedValue(5);

      const result = await service.getTopicBySlug(slug, true);

      expect(result.data.postCount).toBe(5);
      expect(prismaService.blogPost.count).toHaveBeenCalledWith({
        where: {
          isDeleted: false,
          topicId: 'topic-id',
          status: 'PUBLISHED',
        },
      });
    });

    it('should filter only active and non-deleted topics', async () => {
      const slug = 'inactive-topic';

      jest.spyOn(prismaService.blogTopic, 'findFirst').mockResolvedValue(null);

      try {
        await service.getTopicBySlug(slug);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessException);
        const response = (error as any).getResponse();
        expect(response.errorCode).toBe(ERROR_CODES.BLOG_TOPIC_NOT_FOUND);
      }

      expect(prismaService.blogTopic.findFirst).toHaveBeenCalledWith({
        where: {
          isDeleted: false,
          slug,
          isActive: true,
        },
        select: expect.any(Object),
      });
    });

    it('should throw error when topic not found', async () => {
      const slug = 'non-existent-slug';

      jest.spyOn(prismaService.blogTopic, 'findFirst').mockResolvedValue(null);

      try {
        await service.getTopicBySlug(slug);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessException);
        const response = (error as any).getResponse();
        expect(response.errorCode).toBe(ERROR_CODES.BLOG_TOPIC_NOT_FOUND);
      }
    });
  });

  describe('uploadTopicImage', () => {
    it('should upload image and link to topic', async () => {
      const topicId = 'topic-id';
      const userId = 'user-id';
      const mockFile = {
        originalname: 'test-image.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;

      const mockTopic = {
        id: topicId,
        name: 'Test Topic',
        slug: 'test-topic',
        isDeleted: false,
      };

      const mockUploadedMedia = {
        id: 'media-id',
        url: 'https://example.com/image.jpg',
        key: 'blog/topics/test-image.jpg',
        filename: 'test-image.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        type: 'BLOG_TOPIC_IMAGE',
      };

      const mockUpdatedTopic = {
        id: topicId,
        name: 'Test Topic',
        slug: 'test-topic',
        description: null,
        parentId: null,
        imageMediaId: 'media-id',
        isActive: true,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        imageMedia: mockUploadedMedia,
        children: [],
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);

      jest
        .spyOn(storageService, 'uploadFile')
        .mockResolvedValue(mockUploadedMedia as any);

      jest
        .spyOn(prismaService.blogTopic, 'update')
        .mockResolvedValue(mockUpdatedTopic as any);

      const result = await service.uploadTopicImage(topicId, mockFile, userId);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Tải lên hình ảnh chủ đề blog thành công');
      expect(result.data.imageMedia).toBeDefined();
      expect(result.data.imageMedia?.id).toBe('media-id');
      expect(storageService.uploadFile).toHaveBeenCalledWith(
        {
          file: mockFile,
          type: 'BLOG_TOPIC_IMAGE',
          userId,
        },
        {
          getDirectUrl: true,
        },
      );
      expect(prismaService.blogTopic.update).toHaveBeenCalledWith({
        where: { id: topicId },
        data: { imageMediaId: 'media-id' },
        select: expect.any(Object),
      });
    });

    it('should throw error when topic not found', async () => {
      const topicId = 'non-existent-topic';
      const mockFile = {
        originalname: 'test-image.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;

      jest.spyOn(prismaService.blogTopic, 'findFirst').mockResolvedValue(null);

      try {
        await service.uploadTopicImage(topicId, mockFile);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessException);
        const response = (error as any).getResponse();
        expect(response.errorCode).toBe(ERROR_CODES.BLOG_TOPIC_NOT_FOUND);
      }
    });

    it('should throw error for invalid image format', async () => {
      const topicId = 'topic-id';
      const mockFile = {
        originalname: 'test-file.pdf',
        mimetype: 'application/pdf',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;

      const mockTopic = {
        id: topicId,
        name: 'Test Topic',
        slug: 'test-topic',
        isDeleted: false,
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);

      try {
        await service.uploadTopicImage(topicId, mockFile);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessException);
        const response = (error as any).getResponse();
        expect(response.errorCode).toBe(ERROR_CODES.INVALID_IMAGE_FORMAT);
      }
    });

    it('should accept JPEG format', async () => {
      const topicId = 'topic-id';
      const mockFile = {
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;

      const mockTopic = { id: topicId, isDeleted: false };
      const mockMedia = { id: 'media-id' };
      const mockUpdatedTopic = {
        id: topicId,
        imageMediaId: 'media-id',
        children: [],
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);
      jest
        .spyOn(storageService, 'uploadFile')
        .mockResolvedValue(mockMedia as any);
      jest
        .spyOn(prismaService.blogTopic, 'update')
        .mockResolvedValue(mockUpdatedTopic as any);

      const result = await service.uploadTopicImage(topicId, mockFile);
      expect(result.type).toBe('response');
    });

    it('should accept PNG format', async () => {
      const topicId = 'topic-id';
      const mockFile = {
        originalname: 'test.png',
        mimetype: 'image/png',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;

      const mockTopic = { id: topicId, isDeleted: false };
      const mockMedia = { id: 'media-id' };
      const mockUpdatedTopic = {
        id: topicId,
        imageMediaId: 'media-id',
        children: [],
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);
      jest
        .spyOn(storageService, 'uploadFile')
        .mockResolvedValue(mockMedia as any);
      jest
        .spyOn(prismaService.blogTopic, 'update')
        .mockResolvedValue(mockUpdatedTopic as any);

      const result = await service.uploadTopicImage(topicId, mockFile);
      expect(result.type).toBe('response');
    });

    it('should accept WebP format', async () => {
      const topicId = 'topic-id';
      const mockFile = {
        originalname: 'test.webp',
        mimetype: 'image/webp',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;

      const mockTopic = { id: topicId, isDeleted: false };
      const mockMedia = { id: 'media-id' };
      const mockUpdatedTopic = {
        id: topicId,
        imageMediaId: 'media-id',
        children: [],
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);
      jest
        .spyOn(storageService, 'uploadFile')
        .mockResolvedValue(mockMedia as any);
      jest
        .spyOn(prismaService.blogTopic, 'update')
        .mockResolvedValue(mockUpdatedTopic as any);

      const result = await service.uploadTopicImage(topicId, mockFile);
      expect(result.type).toBe('response');
    });

    it('should accept GIF format', async () => {
      const topicId = 'topic-id';
      const mockFile = {
        originalname: 'test.gif',
        mimetype: 'image/gif',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;

      const mockTopic = { id: topicId, isDeleted: false };
      const mockMedia = { id: 'media-id' };
      const mockUpdatedTopic = {
        id: topicId,
        imageMediaId: 'media-id',
        children: [],
      };

      jest
        .spyOn(prismaService.blogTopic, 'findFirst')
        .mockResolvedValue(mockTopic as any);
      jest
        .spyOn(storageService, 'uploadFile')
        .mockResolvedValue(mockMedia as any);
      jest
        .spyOn(prismaService.blogTopic, 'update')
        .mockResolvedValue(mockUpdatedTopic as any);

      const result = await service.uploadTopicImage(topicId, mockFile);
      expect(result.type).toBe('response');
    });
  });
});
