import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';

export class TypeormHelper {
  private connection?: Connection;
  private static instance?: TypeormHelper;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): TypeormHelper {
    if (!this.instance) {
      this.instance = new TypeormHelper();
    }

    return this.instance;
  }

  async connect(): Promise<void> {
    this.connection = getConnectionManager().has('default') ? getConnection() : await createConnection();
  }
}
