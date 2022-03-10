import { readdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { Connection, createConnection } from 'typeorm';
import env from '@/main/config/env';

export class TypeormHelper {
  private connection?: Connection;
  private static instance?: TypeormHelper;

  static getInstance(): TypeormHelper {
    if (!this.instance) {
      this.instance = new TypeormHelper();
    }

    return this.instance;
  }

  async connect(): Promise<void> {
    const migrations = await this.getMigrations();
    this.connection = await createConnection({
      ...env.db,
      migrations,
      type: 'postgres',
      entities: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/typeorm/entities/index.{js,ts}`],
    });

    await this.connection.runMigrations();
  }

  private async getMigrations() {
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrations: any[] = [];
    const dirExists = fs.existsSync(migrationsDir);
    if (dirExists) {
      const files = await readdir(migrationsDir, { encoding: 'utf-8' });
      files
        .map(file => `${migrationsDir}/${file}`)
        .forEach(async file => {
          const imports = await import(file);
          migrations.push(imports.default);
        });
    }
    return migrations;
  }
}
