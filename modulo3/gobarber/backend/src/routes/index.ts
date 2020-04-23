import { Router } from 'express';

import appointementsRouter from './appointements.route';

const routes = Router();

routes.use('/appointements', appointementsRouter);

export default routes;
