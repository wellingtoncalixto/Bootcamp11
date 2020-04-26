import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointementsRouter = Router();
appointementsRouter.use(ensureAuthenticated);

appointementsRouter.get('/', async (request, response) => {
  const appointmentsRespository = getCustomRepository(AppointmentsRepository);

  const appointements = await appointmentsRespository.find();
  return response.json(appointements);
});

appointementsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const paseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: paseDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointementsRouter;
