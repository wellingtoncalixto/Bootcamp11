import { EntityRepository, Repository } from 'typeorm';

import Appointement from '../model/Appointment';

@EntityRepository(Appointement)
class AppointmentsRepository extends Repository<Appointement> {
  public async findByDate(date: Date): Promise<Appointement | null> {
    const findAppointement = await this.findOne({
      where: {
        date,
      },
    });

    return findAppointement || null;
  }
}

export default AppointmentsRepository;
