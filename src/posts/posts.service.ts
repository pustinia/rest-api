import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { CommonModel } from '../common/common.model';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';

// Repository is just like EntityManager but its operations are limited to a concrete entity.

@Injectable()
export class PostsService {
  // logger
  private readonly logger = new Logger(PostsService.name);
  // create constructor
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  // get all posts array data
  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  // get post by id number
  async findOne(id: number): Promise<Posts> {
    const post: Posts = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post;
  }

  // create post
  async create(post: Posts): Promise<Posts> {
    const titleExistCount: number = await this.postsRepository.countBy({
      title: post.title,
    });
    if (titleExistCount) {
      throw new UnprocessableEntityException(`post title already exists`);
    }
    return await this.postsRepository.save(post);
  }

  // delete post
  async delete(id: number): Promise<CommonModel> {
    const idExistCount: number = await this.postsRepository.countBy({ id });
    if (!idExistCount) {
      throw new NotFoundException('Post not found.');
    }
    /* DeleteResult
    {
        "raw": [],
        "affected": 1
    } */
    const deleteResult: DeleteResult = await this.postsRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('Post not found.');
    }
    return new CommonModel(`id: ${id} delete complete.`);
  }

  // update post
  // update it with newly submitted data, and return the updated post
  async update(id: number, post: Posts): Promise<CommonModel> {
    this.logger.log(`Updating post with id : ${id}`);
    const idExistCount: number = await this.postsRepository.countBy({ id });
    if (!idExistCount) {
      throw new NotFoundException('Post not found.');
    }
    const titleExistCount: number = await this.postsRepository.countBy({
      title: post.title,
    });
    if (titleExistCount) {
      throw new UnprocessableEntityException(`post title already exists`);
    }
    /*
    {
    "generatedMaps": [],
    "raw": [],
    "affected": 1
    }
    */
    const updateResult: UpdateResult = await this.postsRepository.update(
      id,
      post,
    );
    if (!updateResult.affected) {
      throw new NotFoundException('Post not found.');
    }
    return new CommonModel(`id: ${id} update complete.`);
  }
}
