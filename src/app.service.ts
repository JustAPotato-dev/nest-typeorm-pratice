import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['pets'],
    }); // SELECT * from user JOIN pets
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id); // SELECT * from WHERE user.id = id;
      return user;
    } catch (err) {
      // handle error
      throw err;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.usersRepository.create({ name }); // const newUser = new User(); newUser.name = name;

    return this.usersRepository.save(newUser); // INSERT
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);

    user.name = name;

    return this.usersRepository.save(user); // UPDATE
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);

    return this.usersRepository.remove(user);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
