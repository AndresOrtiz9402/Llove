import { DynamicModule, Module, Provider } from '@nestjs/common';
/**
 * Global providers module
 *
 * Global module that allows dynamic registration and exporting of providers.
 * This module is designed to register classes, services, or other providers
 * and expose them globally across the NestJS application.
 *
 * @example
 * // Typical usage:
 * GlobalProvidersModule.register([MyService, MyClass]);
 *
 * @remarks
 * - The module is marked as `global: true`, meaning that the registered providers
 *   will be available throughout the application without the need to explicitly
 *   import this module elsewhere.
 * - It is useful for centralizing the provision of services or classes that need
 *   to be globally accessible.
 *
 * @public
 * @class GlobalProvidersModule
 */
@Module({})
export class GlobalProvidersModule {
  /**
   * @method register - Static method for dynamically registering providers.
   * @param {...Provider[]} providers - List of providers to register and export.
   * @returns {DynamicModule} - A dynamic module configured with the provided providers.
   */
  static register(...providers: Provider[]): DynamicModule {
    return {
      module: GlobalProvidersModule,
      global: true,
      providers: [...providers],
      exports: [...providers],
    };
  }
}
