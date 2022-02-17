import { Router } from 'express';
import ConfigRepository from './config.repository';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ConfigRepository(userId);
  const objs = await repository.getAll();
  res.send(objs);
});

router.get('/:id', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ConfigRepository(userId);
  const obj = await repository.get(req.params.id);
  res.send(obj);
});

router.post('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ConfigRepository(userId);
  const id = await repository.create(req.body);
  res.send(id);
});

router.put('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ConfigRepository(userId);
  await repository.update(req.body);
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ConfigRepository(userId);
  await repository.delete(req.params.id);
  res.sendStatus(200);
});

export default router;
