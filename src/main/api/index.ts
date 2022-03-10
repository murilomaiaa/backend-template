import 'reflect-metadata';
import 'dotenv/config';

import { TypeormHelper } from '@/infra/typeorm';
import { app } from './app';
import env from '../config/env';

TypeormHelper.getInstance()
  .connect()
  .then(() => {
    app.listen(env.apiPort, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port ${env.apiPort}`);
    });
  })
  .catch(console.log);
