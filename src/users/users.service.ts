import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ObjectId } from 'mongodb';
import * as fs from 'fs';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.usersRepository, options);
  }

  createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  } 

  async updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOneById(userId);
    const userIdToUpdate = user._id;
    if (!user) {
      throw new Error(`User with userId ${userId} not found`);
    }
  
    Object.assign(user, updateUserInput);
    await this.usersRepository.update(userIdToUpdate, user);
    return user;
  }

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  findAll(): Promise<Pagination<User>> {
    const options: IPaginationOptions = {
      page: 1,
      limit: 10
    }
    return this.paginate(options);
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ _id: new ObjectId(id) });
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

  async deleteUser(id: string): Promise<User> {
    const user = await this.findOneById(id);
    if(!user) {
      throw new Error(`User ${id} doesn't exist`);
    }
    const imgLink = user.image.map(image => image.url);
    imgLink.forEach(url => {
      // Extract the file path from the URL
      const filePath = url.substring(url.lastIndexOf('/') + 1);
    
      // Delete the local file
      fs.unlink(filePath, err => {
        if (err) {
          console.error(`Error deleting file '${filePath}':`, err);
        } else {
          console.log(`Successfully deleted file '${filePath}'`);
        }
      });
    });
    await this.usersRepository.delete(id);
    return user;
  }
}
