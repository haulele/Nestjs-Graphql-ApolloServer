import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  
  createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  } 

  async updateUser(username: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(username);
    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }
  
    Object.assign(user, updateUserInput);
    await this.usersRepository.save(user);
  
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async FindOneWithResizedImage (username: string, imagesize?: string): Promise<User | null> {
    const userinfo = await this.usersRepository.findOneBy({ username });
    const userimage = userinfo.image;
    let image: { url: string; altText: string; }[];
    if(!imagesize || imagesize === 'N'){
      const imageN = userimage.find(image => image.altText === 'N');
      image = imageN ? [{ url: imageN.url, altText: 'N' }] : [];
    }
    else {
      switch (imagesize) {
        case 'L':
          const imageL = userimage.find(image => image.altText === imagesize);
          image = imageL ? [{ url: imageL.url, altText: imagesize }] : [];
          break;
        case 'M':
          const imageM = userimage.find(image => image.altText === imagesize);
          image = imageM ? [{ url: imageM.url, altText: imagesize }] : [];
          break;
        case 'S':
          const imageS = userimage.find(image => image.altText === imagesize);
          image = imageS ? [{ url: imageS.url, altText: imagesize }] : [];
          break;
        default:
          throw new Error(`Invalid size: ${imagesize}`);
      }
    }
    const userWithResizedImage = {
      ...userinfo,
      image,
    };
    return userWithResizedImage;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
