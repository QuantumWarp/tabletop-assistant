import { Router } from 'express';
import HistoryRepository from './history.repository';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId || '';
  const tabletopId = req.query.tabletopId?.toString() || '';
  const repository = new HistoryRepository(userId);
  const objs = await repository.getAll(tabletopId);
  res.send(objs);
});

router.get('/:id', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new HistoryRepository(userId);
  const obj = await repository.get(req.params.id);
  res.send(obj);
});

router.post('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new HistoryRepository(userId);
  const obj = await repository.create(req.body);
  res.send(obj);
});

router.put('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new HistoryRepository(userId);
  const obj = await repository.update(req.body);
  res.send(obj);
});

router.delete('/:id', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new HistoryRepository(userId);
  await repository.delete(req.params.id);
  res.sendStatus(204);
});

export default router;
