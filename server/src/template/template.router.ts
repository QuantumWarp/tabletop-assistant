import { Router } from 'express';
import EntityRepository from '../entity/entity.repository';
import LayoutRepository from '../layout/layout.repository';
import TemplateRepository from './template.repository';
import TemplateService from './template.service';

const router = Router();

router.get('/', async (req, res) => {
  const repository = new TemplateRepository();
  const objs = await repository.getSummaries();
  res.send(objs);
});

router.post('/import', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new TemplateService(
    new EntityRepository(userId),
    new LayoutRepository(userId),
    new TemplateRepository(),
  );
  await repository.import(req.body.templateId, req.body.tabletopId);
  res.sendStatus(204);
});

export default router;
