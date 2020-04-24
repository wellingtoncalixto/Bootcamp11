import { isEqual } from 'date-fns';
import Appointment from '../model/Appointment';

interface CreateAppointementDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointements: Appointment[];

  constructor() {
    this.appointements = [];
  }

  public all(): Appointment[] {
    return this.appointements;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointement = this.appointements.find(appointement => {
      isEqual(date, appointement.date);
    });

    return findAppointement || null;
  }

  public create({ provider, date }: CreateAppointementDTO): Appointment {
    const appointement = new Appointment({ provider, date });

    this.appointements.push(appointement);

    return appointement;
  }
}

export default AppointmentRepository;
