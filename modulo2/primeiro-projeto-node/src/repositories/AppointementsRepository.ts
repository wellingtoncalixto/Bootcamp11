import { isEqual } from 'date-fns';
import Appointement from '../model/Appointment';

interface CreateAppointementDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointements: Appointement[];

  constructor() {
    this.appointements = [];
  }

  public all(): Appointement[] {
    return this.appointements;
  }

  public findByDate(date: Date): Appointement | null {
    const findAppointement = this.appointements.find(appointement => {
      isEqual(date, appointement.date);
    });

    return findAppointement || null;
  }

  public create({ provider, date }: CreateAppointementDTO): Appointement {
    const appointement = new Appointement({ provider, date });

    this.appointements.push(appointement);

    return appointement;
  }
}

export default AppointmentRepository;
