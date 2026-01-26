import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  MailModuleOptions,
  MailModuleAsyncOptions,
  MailModuleOptionsFactory,
  MAIL_MODULE_OPTIONS,
} from './interfaces';
import { MailService } from './mail.service';
import { TemplateService } from './template.service';
import { MailController } from './mail.controller';

@Global()
@Module({})
export class MailModule {
  /**
   * Register mail module with synchronous configuration
   */
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      controllers: [MailController],
      providers: [
        {
          provide: MAIL_MODULE_OPTIONS,
          useValue: options,
        },
        TemplateService,
        MailService,
      ],
      exports: [MailService, TemplateService],
    };
  }

  /**
   * Register mail module with asynchronous configuration
   */
  static forRootAsync(options: MailModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: MailModule,
      imports: options.imports || [],
      controllers: [MailController],
      providers: [...asyncProviders, TemplateService, MailService],
      exports: [MailService, TemplateService],
    };
  }

  private static createAsyncProviders(
    options: MailModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: MAIL_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    if (options.useClass) {
      return [
        {
          provide: MAIL_MODULE_OPTIONS,
          useFactory: async (optionsFactory: MailModuleOptionsFactory) =>
            await optionsFactory.createMailOptions(),
          inject: [options.useClass],
        },
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: MAIL_MODULE_OPTIONS,
          useFactory: async (optionsFactory: MailModuleOptionsFactory) =>
            await optionsFactory.createMailOptions(),
          inject: [options.useExisting],
        },
      ];
    }

    return [];
  }
}
