import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointementsRepository';

const appointementsRouter = Router();
const appointementsRepository = new AppointmentRepository();

appointementsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointementsInSameDate = appointementsRepository.findByDate(
    parsedDate,
  );

  if (findAppointementsInSameDate) {
    return response
      .status(400)
      .json({ mensage: 'This appointemet is already booked' });
  }

  const appointement = appointementsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointement);
});

appointementsRouter.get('/', (request, response) => {
  const appointements = appointementsRepository.all();

  return response.json(appointements);
});

export default appointementsRouter;
