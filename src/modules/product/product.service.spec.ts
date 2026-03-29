import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { BusinessException } from '../../exceptions/business.exception';
import { ERROR_CODES } from '../../constants/error-codes';
import {
  withoutDeleted,
  softDeleteData,
} from '../../libs/prisma/soft-delete.helpers';

describe('ProductService - Soft Delete Implementation', () => {
  let service: ProductService;
  let prismaService: jest.Mocked<PrismaService>;
  let storageService: jest.Mocked<StorageService>;

  // Test factory for creating product DTOs
  const createProductDto = (overrides?: Partial<any>) => ({
    name: 'Test Product',
    sku: 'TEST-SKU',
    basePrice: 100,
    categoryIds: ['cat-1'],
    brandId: 'brand-id-123',
    ...overrides,
  });

  const mockProduct = {
    id: 'product-id-123',
    name: 'Test Product',
    slug: 'test-product',
    sku: 'TEST-SKU-001',
    basePrice: 100,
    isActive: true,
    isFeatured: false,
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    brandId: 'brand-id-123',
    variants: [],
    images: [],
    badges: [],
    inventory: [],
  };

  const mockVariant = {
    id: 'variant-id-123',
    productId: 'product-id-123',
    sku: 'VAR-SKU-001',
    name: 'Default',
    price: 100,
    sortOrder: 0,
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDeletedProduct = {
    ...mockProduct,
    id: 'deleted-product-id',
    isDeleted: true,
    deletedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
            },
            productVariant: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
              delete: jest.fn(),
            },
            productInventory: {
              createMany: jest.fn(),
            },
            category: {
              findMany: jest.fn(),
            },
            brand: {
              findFirst: jest.fn(),
              findUnique: jest.fn(),
            },
            orderItem: {
              count: jest.fn(),
              groupBy: jest.fn(),
            },
            productReview: {
              groupBy: jest.fn(),
            },
            $transaction: jest.fn(),
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

    service = module.get<ProductService>(ProductService);
    prismaService = module.get(PrismaService) as jest.Mocked<PrismaService>;
    storageService = module.get(StorageService) as jest.Mocked<StorageService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Task 2.1: getAllProducts() - Query Filtering', () => {
    it('should filter out soft-deleted products using withoutDeleted()', async () => {
      const mockProducts = [mockProduct];
      (prismaService.product.count as jest.Mock).mockResolvedValue(1);
      (prismaService.product.findMany as jest.Mock).mockResolvedValue(
        mockProducts,
      );

      await service.getAllProducts({ page: 1, limit: 10 });

      expect(prismaService.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isDeleted: false }),
        }),
      );
    });

    it('should not return soft-deleted products in results', async () => {
      (prismaService.product.count as jest.Mock).mockResolvedValue(1);
      (prismaService.product.findMany as jest.Mock).mockResolvedValue([
        mockProduct,
      ]);

      const result = await service.getAllProducts({ page: 1, limit: 10 });

      expect(result.data.items).toHaveLength(1);
      expect(result.data.totalCount).toBe(1);
    });
  });

  describe('Task 2.2: getProductById() - findFirst with isDeleted filter', () => {
    it('should use findFirst instead of findUnique', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        mockProduct,
      );

      await service.getProductById('product-id-123');

      expect(prismaService.product.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'product-id-123' }),
        select: expect.any(Object),
      });
    });

    it('should throw PRODUCT_NOT_FOUND when product is soft-deleted', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.getProductById('deleted-product-id'),
      ).rejects.toThrow(BusinessException);
    });

    it('should return product when product exists and is not deleted', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        mockProduct,
      );

      const result = await service.getProductById('product-id-123');

      expect(result.data).toBeDefined();
      expect(result.message).toBe('Lấy thông tin sản phẩm thành công');
    });
  });

  describe('Task 2.7: deleteProduct() - Cascading Soft Delete', () => {
    it('should verify product exists before deleting', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        mockProduct,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(0);
      (prismaService.$transaction as jest.Mock).mockImplementation((ops) =>
        Promise.all(ops),
      );
      (prismaService.productVariant.updateMany as jest.Mock).mockResolvedValue({
        count: 1,
      });
      (prismaService.product.update as jest.Mock).mockResolvedValue(
        mockProduct,
      );

      await service.deleteProduct('product-id-123');

      expect(prismaService.product.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'product-id-123' }),
        select: expect.any(Object),
      });
    });

    it('should soft delete product and all variants in transaction', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        mockProduct,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(0);
      (prismaService.$transaction as jest.Mock).mockImplementation((ops) =>
        Promise.all(ops),
      );
      (prismaService.productVariant.updateMany as jest.Mock).mockResolvedValue({
        count: 2,
      });
      (prismaService.product.update as jest.Mock).mockResolvedValue(
        mockProduct,
      );

      await service.deleteProduct('product-id-123');

      expect(prismaService.$transaction).toHaveBeenCalled();
      expect(prismaService.productVariant.updateMany).toHaveBeenCalledWith({
        where: { productId: 'product-id-123' },
        data: expect.objectContaining({
          isDeleted: true,
          deletedAt: expect.any(Date),
        }),
      });
      expect(prismaService.product.update).toHaveBeenCalledWith({
        where: { id: 'product-id-123' },
        data: expect.objectContaining({
          isDeleted: true,
          deletedAt: expect.any(Date),
        }),
      });
    });

    it('should throw error when product has orders', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        mockProduct,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(5);

      await expect(service.deleteProduct('product-id-123')).rejects.toThrow(
        BusinessException,
      );
    });

    it('should throw error when product is already deleted', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.deleteProduct('deleted-product-id')).rejects.toThrow(
        BusinessException,
      );
    });

    it('should rollback if transaction fails', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        mockProduct,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(0);
      (prismaService.$transaction as jest.Mock).mockRejectedValue(
        new Error('Transaction failed'),
      );

      await expect(service.deleteProduct('product-id-123')).rejects.toThrow();
    });
  });

  describe('Task 2.8: deleteProductVariant() - Soft Delete', () => {
    it('should verify variant exists and is not deleted before deleting', async () => {
      (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
        mockVariant,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(0);
      (prismaService.productVariant.update as jest.Mock).mockResolvedValue(
        mockVariant,
      );

      await service.deleteProductVariant('product-id-123', 'variant-id-123');

      expect(prismaService.productVariant.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({
          id: 'variant-id-123',
          productId: 'product-id-123',
        }),
        select: { id: true },
      });
    });

    it('should use soft delete instead of hard delete', async () => {
      (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
        mockVariant,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(0);
      (prismaService.productVariant.update as jest.Mock).mockResolvedValue(
        mockVariant,
      );

      await service.deleteProductVariant('product-id-123', 'variant-id-123');

      expect(prismaService.productVariant.update).toHaveBeenCalledWith({
        where: { id: 'variant-id-123' },
        data: softDeleteData(),
      });
      expect(prismaService.productVariant.delete).not.toHaveBeenCalled();
    });

    it('should throw error when variant has orders', async () => {
      (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
        mockVariant,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(3);

      await expect(
        service.deleteProductVariant('product-id-123', 'variant-id-123'),
      ).rejects.toThrow(BusinessException);
    });

    it('should throw error when variant is already deleted', async () => {
      (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
        null,
      );

      await expect(
        service.deleteProductVariant('product-id-123', 'deleted-variant-id'),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('Task 2.9: createProduct() - Validation filters deleted records', () => {
    // Helper to setup common mocks for product creation
    const setupProductCreationMocks = () => {
      (prismaService.product.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // SKU check
        .mockResolvedValueOnce(mockProduct); // Re-fetch after create
      (prismaService.category.findMany as jest.Mock).mockResolvedValue([
        { id: 'cat-1' },
      ]);
      (prismaService.brand.findUnique as jest.Mock).mockResolvedValue({
        id: 'brand-id-123',
      });
      (prismaService.productVariant.findMany as jest.Mock)
        .mockResolvedValueOnce([]) // Variant SKU check
        .mockResolvedValueOnce([{ id: 'variant-1', sku: 'NEW-SKU-DEFAULT' }]); // Created variants
      (prismaService.product.create as jest.Mock).mockResolvedValue(
        mockProduct,
      );
      (
        prismaService.productInventory.createMany as jest.Mock
      ).mockResolvedValue({ count: 1 });
    };

    it('should exclude deleted brands from validation', async () => {
      setupProductCreationMocks();

      await service.createProduct(
        createProductDto({
          name: 'New Product',
          sku: 'NEW-SKU',
          basePrice: 100,
          categoryIds: ['cat-1'],
          brandId: 'brand-id-123',
        }),
      );

      expect(prismaService.brand.findUnique).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'brand-id-123' }),
        select: { id: true },
      });
    });

    it('should throw error when brand is deleted', async () => {
      (prismaService.product.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaService.category.findMany as jest.Mock).mockResolvedValue([
        { id: 'cat-1' },
      ]);
      (prismaService.brand.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.createProduct(
          createProductDto({
            name: 'New Product',
            sku: 'NEW-SKU',
            basePrice: 100,
            categoryIds: ['cat-1'],
            brandId: 'deleted-brand-id',
          }),
        ),
      ).rejects.toThrow(BusinessException);

      // Verify it checked with withoutDeleted filter
      expect(prismaService.brand.findUnique).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'deleted-brand-id' }),
        select: { id: true },
      });
    });
  });

  describe('getProductBySlug() - findFirst with isDeleted filter', () => {
    it('should use findFirst instead of findUnique', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        mockProduct,
      );

      await service.getProductBySlug('test-product');

      expect(prismaService.product.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ slug: 'test-product' }),
        select: expect.any(Object),
      });
    });

    it('should throw PRODUCT_NOT_FOUND when product slug is deleted', async () => {
      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.getProductBySlug('deleted-product-slug'),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('Cascading Delete Atomicity', () => {
    it('should ensure all variants are deleted when product is deleted', async () => {
      const productWithVariants = {
        ...mockProduct,
        variants: [
          { ...mockVariant, id: 'var-1' },
          { ...mockVariant, id: 'var-2' },
          { ...mockVariant, id: 'var-3' },
        ],
      };

      (prismaService.product.findFirst as jest.Mock).mockResolvedValue(
        productWithVariants,
      );
      (prismaService.orderItem.count as jest.Mock).mockResolvedValue(0);
      (prismaService.$transaction as jest.Mock).mockImplementation((ops) =>
        Promise.all(ops),
      );
      (prismaService.productVariant.updateMany as jest.Mock).mockResolvedValue({
        count: 3,
      });
      (prismaService.product.update as jest.Mock).mockResolvedValue(
        mockProduct,
      );

      await service.deleteProduct('product-id-123');

      expect(prismaService.productVariant.updateMany).toHaveBeenCalledWith({
        where: { productId: 'product-id-123' },
        data: expect.objectContaining({
          isDeleted: true,
          deletedAt: expect.any(Date),
        }),
      });
    });
  });
});
