import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {}
