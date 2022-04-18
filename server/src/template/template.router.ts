import { Router } from 'express';
import TemplateRepository from './template.repository';

const router = Router();

router.get('/', async (req, res) => {
  const repository = new TemplateRepository();
  const objs = await repository.getAll();
  res.send(objs);
});

export default router;
