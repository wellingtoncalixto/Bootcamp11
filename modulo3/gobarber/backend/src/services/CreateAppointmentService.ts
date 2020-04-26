import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentsInsameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInsameDate) {
      throw new AppError('this appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    try {
      await appointmentsRepository.save(appointment);

      return appointment;
    } catch (err) {
      return err;
    }
  }
}

export default CreateAppointmentService;
