import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExist = await usersRepository.findOne({ where: { email } });

    if (checkUserExist) {
      throw new AppError('user email alredy exist');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
