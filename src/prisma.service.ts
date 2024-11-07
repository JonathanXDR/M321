import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * @class PrismaService
 * Extends PrismaClient to provide a Prisma database connection service in a NestJS application.
 * Implements the `OnModuleInit` lifecycle hook to establish a connection when the module is initialized.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Lifecycle hook that is called when the module is initialized.
   * Connects to the Prisma database.
   */
  async onModuleInit() {
    await this.$connect();
  }
}
