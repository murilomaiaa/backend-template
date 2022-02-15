import express, { Express } from 'express';
import request from 'supertest';
import { paginate } from '@/infra/http/middlewares';

describe('paginate', () => {
  let server: Express;
  beforeAll(() => {
    server = express();
    server.use(express.json());
    server.get('/paginate-test', paginate({ skip: 0, take: 20 }), (req, res) => res.json(req.query));
  });

  it('should apply take=20 and skip=0 in req.query if its not applied', async () => {
    await request(server).get('/paginate-test').expect({ skip: '0', take: '20' });
  });

  it('should keep take and apply skip=0 in req.query if its not applied', async () => {
    await request(server).get('/paginate-test?take=15').expect({ skip: '0', take: '15' });
  });

  it('should keep skip and apply take=20 in req.query if its not applied', async () => {
    await request(server).get('/paginate-test?skip=15').expect({ skip: '15', take: '20' });
  });

  it('should keep skip and take req.query if its applied', async () => {
    await request(server).get('/paginate-test?skip=30&take=15').expect({ skip: '30', take: '15' });
  });
});
