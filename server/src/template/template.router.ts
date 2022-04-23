import { Router } from 'express';
import TemplateRepository from './template.repository';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new TemplateRepository(userId);
  const objs = await repository.getSummaries();
  res.send(objs);
});

router.post('/import', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new TemplateRepository(userId);
  await repository.import(req.body.templateId, req.body.tabletopId);
  res.sendStatus(204);
});

export default router;
