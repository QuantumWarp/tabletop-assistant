import { Request, Router } from 'express';
import EntityRepository from '../entity/entity.repository';
import LayoutRepository from '../layout/layout.repository';
import TemplateRepository from './template.repository';
import TemplateService from './template.service';
import TemplatedEntityRepository from './templated-entity.repository';
import TemplatedLayoutRepository from './templated-layout.repository';

const router = Router();

router.get('/', async (req, res) => {
  const repository = new TemplateRepository();
  const objs = await repository.getAll();
  res.send(objs);
});

router.get('/layouts', async (req: Request<{ ids: string[] }>, res) => {
  const repository = new TemplatedLayoutRepository();
  const ids = req.params.ids || undefined;
  const objs = await repository.getAll(ids);
  res.send(objs);
});

router.get('/entities', async (req: Request<{ ids: string[] }>, res) => {
  const repository = new TemplatedEntityRepository();
  const ids = req.params.ids || undefined;
  const objs = await repository.getAll(ids);
  res.send(objs);
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
