import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/User.entity';
import { AuthDto } from './dto/auth.dto';
import { UsersRepository } from './repositories/auth.repository';
const saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create({ username, password }: AuthDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const findUsername = await this.usersRepository.findOne({
      where: { username },
    });
    if (findUsername) {
      throw new ConflictException('Username already exists');
    }
    const user = await this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async validateUser({
    username,
    password,
  }: AuthDto): Promise<string | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwtService.sign({ id: user.id, username: user.username });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
