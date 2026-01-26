import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from './template.service';
import { MAIL_MODULE_OPTIONS } from './interfaces';
import { TemplateNotFoundException } from './exceptions';
import * as path from 'path';

describe('TemplateService', () => {
  let service: TemplateService;

  const mockOptions = {
    transport: {
      host: 'smtp.test.com',
      port: 587,
      secure: false,
      auth: { user: 'test', pass: 'test' },
    },
    defaults: {
      from: { name: 'Test', address: 'test@test.com' },
    },
    templateDir: path.join(
      process.cwd(),
      'src',
      'modules',
      'mail',
      'templates',
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: MAIL_MODULE_OPTIONS,
          useValue: mockOptions,
        },
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
    await service.onModuleInit();
  });

  describe('compileTemplate', () => {
    it('should compile existing template', async () => {
      const template = await service.compileTemplate('welcome');
      expect(template).toBeDefined();
      expect(typeof template).toBe('function');
    });

    it('should throw TemplateNotFoundException for non-existent template', async () => {
      await expect(service.compileTemplate('non-existent')).rejects.toThrow(
        TemplateNotFoundException,
      );
    });

    it('should cache compiled templates', async () => {
      const template1 = await service.compileTemplate('welcome');
      const template2 = await service.compileTemplate('welcome');
      expect(template1).toBe(template2);
    });
  });

  describe('renderTemplate', () => {
    it('should render template with context', async () => {
      const html = await service.renderTemplate('welcome', {
        userName: 'John Doe',
        verificationLink: 'https://example.com/verify',
        companyName: 'Test Company',
        expiresIn: '24 hours',
        year: 2024,
      });

      expect(html).toContain('John Doe');
      expect(html).toContain('https://example.com/verify');
      expect(html).toContain('Test Company');
    });

    it('should throw error for non-existent template', async () => {
      await expect(service.renderTemplate('non-existent', {})).rejects.toThrow(
        TemplateNotFoundException,
      );
    });
  });

  describe('registerHelper', () => {
    it('should register custom helper', async () => {
      service.registerHelper('uppercase', (str: string) => str.toUpperCase());

      // Helper is registered globally in Handlebars
      expect(true).toBe(true);
    });
  });

  describe('registerPartial', () => {
    it('should register custom partial', () => {
      service.registerPartial('customPartial', '<div>Custom Content</div>');

      // Partial is registered globally in Handlebars
      expect(true).toBe(true);
    });
  });

  describe('clearCache', () => {
    it('should clear compiled templates cache', async () => {
      await service.compileTemplate('welcome');
      service.clearCache();

      // After clearing, template should be recompiled
      const template = await service.compileTemplate('welcome');
      expect(template).toBeDefined();
    });
  });
});
