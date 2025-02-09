import {Router} from 'express';
import {addCache, getCache, deleteCache} from '../controllers/cache.controller';

const cacheRouter = Router();

cacheRouter.post('/', addCache);
cacheRouter.get('/:key', getCache);
cacheRouter.delete('/:key', deleteCache);

export default cacheRouter;
