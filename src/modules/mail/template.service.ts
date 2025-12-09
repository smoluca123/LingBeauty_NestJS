import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { TemplateNotFoundException } from './exceptions';
import { MAIL_MODULE_OPTIONS } from './interfaces';
import type { MailModuleOptions } from './interfaces';

@Injectable()
export class TemplateService implements OnModuleInit {
  private readonly logger = new Logger(TemplateService.name);
  private compiledTemplates: Map<string, Handlebars.TemplateDelegate> =
    new Map();
  private templateDir: string;

  constructor(
    @Inject(MAIL_MODULE_OPTIONS)
    private readonly options: MailModuleOptions,
  ) {
    // Use absolute path from project root to ensure templates are found
    this.templateDir =
      options.templateDir ||
      path.resolve(__dirname, '..', '..', '..', 'modules', 'mail', 'templates');

    // Fallback: try src directory if dist path doesn't exist
    if (!fs.existsSync(this.templateDir)) {
      this.templateDir = path.join(
        process.cwd(),
        'src',
        'modules',
        'mail',
        'templates',
      );
    }

    this.logger.log(`Template directory: ${this.templateDir}`);
  }

  async onModuleInit(): Promise<void> {
    await this.loadPartials();
    this.registerDefaultHelpers();
  }

  /**
   * Load all partials from the partials directory
   */
  private async loadPartials(): Promise<void> {
    const partialsDir = path.join(this.templateDir, 'partials');

    if (!fs.existsSync(partialsDir)) {
      return;
    }

    const files = fs.readdirSync(partialsDir);

    for (const file of files) {
      if (file.endsWith('.hbs')) {
        const partialName = path.basename(file, '.hbs');
        const partialPath = path.join(partialsDir, file);
        const partialContent = fs.readFileSync(partialPath, 'utf-8');
        Handlebars.registerPartial(partialName, partialContent);
      }
    }
  }

  /**
   * Register default Handlebars helpers
   */
  private registerDefaultHelpers(): void {
    // Helper for formatting currency
    Handlebars.registerHelper('formatCurrency', (value: number) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value);
    });

    // Helper for formatting date
    Handlebars.registerHelper('formatDate', (date: string | Date) => {
      return new Date(date).toLocaleDateString('vi-VN');
    });

    // Helper for equality check
    Handlebars.registerHelper('eq', (a: unknown, b: unknown) => a === b);

    // Helper for greater than
    Handlebars.registerHelper('gt', (a: number, b: number) => a > b);

    // Helper for less than
    Handlebars.registerHelper('lt', (a: number, b: number) => a < b);
  }

  /**
   * Compile a template by name
   */
  async compileTemplate(
    templateName: string,
  ): Promise<Handlebars.TemplateDelegate> {
    // Check if already compiled
    if (this.compiledTemplates.has(templateName)) {
      return this.compiledTemplates.get(templateName)!;
    }

    const templatePath = path.join(this.templateDir, `${templateName}.hbs`);

    if (!fs.existsSync(templatePath)) {
      throw new TemplateNotFoundException(templateName);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiled = Handlebars.compile(templateContent);

    this.compiledTemplates.set(templateName, compiled);

    return compiled;
  }

  /**
   * Render a template with context data
   */
  async renderTemplate(
    templateName: string,
    context: Record<string, unknown>,
  ): Promise<string> {
    const template = await this.compileTemplate(templateName);
    return template(context);
  }

  /**
   * Register a custom Handlebars helper
   */
  registerHelper(name: string, helper: Handlebars.HelperDelegate): void {
    Handlebars.registerHelper(name, helper);
  }

  /**
   * Register a custom partial
   */
  registerPartial(name: string, partial: string): void {
    Handlebars.registerPartial(name, partial);
  }

  /**
   * Clear compiled templates cache
   */
  clearCache(): void {
    this.compiledTemplates.clear();
  }
}
