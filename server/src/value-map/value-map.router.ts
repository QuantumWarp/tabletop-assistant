import { Router } from 'express';
import ValueMapRepository from './value-map.repository';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId || '';
  const tabletopId = req.query.tabletopId?.toString() || '';
  const repository = new ValueMapRepository(userId);
  const objs = await repository.getAll(tabletopId);
  res.send(objs);
});

router.get('/:entityId', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ValueMapRepository(userId);
  const obj = await repository.get(req.params.entityId);
  res.send(obj);
});

router.post('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ValueMapRepository(userId);
  const obj = await repository.create(req.body);
  res.send(obj);
});

router.put('/', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ValueMapRepository(userId);
  const obj = await repository.update(req.body);
  res.send(obj);
});

router.delete('/:entityId', async (req, res) => {
  const userId = req.session.userId || '';
  const repository = new ValueMapRepository(userId);
  await repository.delete(req.params.entityId);
  res.sendStatus(204);
});

export default router;
