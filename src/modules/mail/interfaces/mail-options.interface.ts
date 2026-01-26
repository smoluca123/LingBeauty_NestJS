/**
 * SMTP Transport configuration
 */
export interface SmtpTransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

/**
 * Email sender information
 */
export interface MailSender {
  name: string;
  address: string;
}

/**
 * Mail module configuration options
 */
export interface MailModuleOptions {
  transport: SmtpTransportOptions;
  defaults: {
    from: MailSender;
  };
  templateDir?: string;
}

/**
 * Async module options factory interface
 */
export interface MailModuleOptionsFactory {
  createMailOptions(): Promise<MailModuleOptions> | MailModuleOptions;
}

/**
 * Async module configuration options
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface MailModuleAsyncOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imports?: any[];
  useFactory?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<MailModuleOptions> | MailModuleOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClass?: new (...args: any[]) => MailModuleOptionsFactory;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useExisting?: new (...args: any[]) => MailModuleOptionsFactory;
}

/**
 * Email attachment
 */
export interface Attachment {
  filename: string;
  content?: Buffer | string;
  path?: string;
  contentType?: string;
}

/**
 * Options for sending raw email (without template)
 */
export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Attachment[];
  from?: MailSender;
}

/**
 * Options for sending templated email
 */
export interface SendTemplatedMailOptions {
  to: string | string[];
  subject: string;
  template: string;
  context: Record<string, unknown>;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Attachment[];
  from?: MailSender;
}

/**
 * Result of sending an email
 */
export interface SendMailResult {
  success: boolean;
  messageId: string;
}
