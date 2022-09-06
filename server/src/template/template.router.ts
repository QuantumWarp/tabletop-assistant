import { Request, Router } from 'express';
import EntityRepository from '../entity/entity.repository';
import LayoutRepository from '../layout/layout.repository';
import TemplateRepository from './template.repository';
import TemplateService from './template.service';
import TemplatedEntityRepository from './templated-entity.repository';
import TemplatedLayoutRepository from './templated-layout.repository';

const router = Router();

router.get('/summaries', async (req, res) => {
  const userId = req.session.userId || '';
  const service = new TemplateService(
    new EntityRepository(userId),
    new LayoutRepository(userId),
    new TemplateRepository(),
    new TemplatedLayoutRepository(),
    new TemplatedEntityRepository(),
  );
  const obj = await service.summaries();
  res.send(obj);
});

router.post('/import', async (req, res) => {
  const userId = req.session.userId || '';
  const service = new TemplateService(
    new EntityRepository(userId),
    new LayoutRepository(userId),
    new TemplateRepository(),
    new TemplatedLayoutRepository(),
    new TemplatedEntityRepository(),
  );
  await service.import(req.body);
  res.sendStatus(204);
});

export default router;
