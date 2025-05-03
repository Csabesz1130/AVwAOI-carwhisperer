import { UploadProviderAws } from './providers/aws/upload.provider.aws';
import { UploadProviderLocal } from './providers/local/upload.provider.local';
import { UploadProvider } from './providers/upload.provider';
import { UploadFileType } from './upload.type';

// Simple logger implementation (replace with a proper library like Pino in production)
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
};

class Service {
  private instance: UploadProvider | null = null; // Initialize as null
  private isInitializing = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {}

  private setup(): Promise<void> {
    // Prevent concurrent initialization
    if (this.isInitializing && this.initializationPromise) { // Check if promise exists
      return this.initializationPromise;
    }
    if (this.instance) {
      return Promise.resolve(); // Return a resolved promise if already initialized
    }

    this.isInitializing = true;
    this.initializationPromise = (async () => {
      try {
        // Try AWS first
        try {
          logger.info('Attempting to initialize AWS upload provider...');
          const awsInstance = new UploadProviderAws();
          await awsInstance.initialise();
          this.instance = awsInstance;
          logger.info('AWS upload provider initialized successfully.');
          return; // Corresponds to void in Promise<void>
        } catch (awsError: any) {
          logger.warn('Could not initialize AWS provider:', awsError.message);
        }

        // Fallback to local provider
        logger.warn(
          'Falling back to local upload provider (NOT RECOMMENDED FOR PRODUCTION)'
        );
        try {
          const localInstance = new UploadProviderLocal();
          await localInstance.initialise();
          this.instance = localInstance;
          logger.info('Local upload provider initialized successfully.');
          return; // Corresponds to void in Promise<void>
        } catch (localError: any) {
          logger.error(
            'Could not initialize local provider:',
            localError.message
          );
        }

        // If neither provider initialized, throw an error
        // This error will reject the initializationPromise
        throw new Error('Failed to initialize any upload provider.');
      } finally {
        this.isInitializing = false;
        // Keep initializationPromise until next setup call to handle errors
      }
    })();

    return this.initializationPromise; // Return the promise itself
  }

  // Helper to get the instance or throw if setup failed
  private getInstance(): UploadProvider {
    if (!this.instance) {
      // This should ideally not happen if setup throws error correctly
      logger.error('Upload provider instance is not available after setup.');
      throw new Error('Upload provider failed to initialize.');
    }
    return this.instance;
  }

  async uploadPublic(...files: UploadFileType[]): Promise<{ url: string }[]> {
    await this.setup()
    const instance = this.getInstance();

    const responses = []

    for (const file of files) {
      // Add logging for each file upload attempt
      logger.info(`Uploading public file: ${file.name} (${file.mimetype})`);
      try {
        const response = await instance.uploadPublic({ file });
        responses.push(response);
        logger.info(`Successfully uploaded public file: ${file.name}, URL: ${response.url}`);
      } catch (uploadError: any) {
        logger.error(`Failed to upload public file ${file.name}:`, uploadError);
        // Decide how to handle partial failures: throw, return partial results, or mark errors?
        // For now, just log and continue to the next file.
      }
    }

    return responses
  }

  async uploadPrivate(...files: UploadFileType[]): Promise<{ url: string }[]> {
    await this.setup()
    const instance = this.getInstance();

    const responses = []

    for (const file of files) {
      logger.info(`Uploading private file: ${file.name} (${file.mimetype})`);
      try {
        const response = await instance.uploadPrivate({ file });
        responses.push(response);
        logger.info(`Successfully uploaded private file: ${file.name}, URL: ${response.url}`);
      } catch (uploadError: any) {
        logger.error(`Failed to upload private file ${file.name}:`, uploadError);
        // Handle partial failures
      }
    }

    return responses
  }

  async fromPrivateToPublicUrl(
    ...items: { url: string; expiresInSeconds?: number }[]
  ): Promise<{ url: string }[]> {
    await this.setup()
    const instance = this.getInstance();

    const responses = []

    for (const item of items) {
      logger.info(`Generating public URL for private URL: ${item.url}`);
      try {
        const response = await instance.fromPrivateToPublicUrl(item);
        responses.push(response);
        logger.info(`Successfully generated public URL: ${response.url}`);
      } catch (urlError: any) {
        logger.error(`Failed to generate public URL for ${item.url}:`, urlError);
        // Handle partial failures
      }
    }

    return responses
  }
}

export const UploadService = new Service()
