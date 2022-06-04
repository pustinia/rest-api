import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { PostModel } from './posts.interface';

@Injectable()
export class PostsService {
  // logger
  private readonly logger = new Logger(PostsService.name);
  // eslint-disable-next-line prettier/prettier
  private posts : Array<PostModel> = [];

  // get all posts array data
  public findAll(): Array<PostModel> {
    return this.posts;
  }
  // get post by id number
  public findOne(id: number): PostModel {
    const post: PostModel = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post;
  }
  // create post
  public create(post: PostModel): PostModel {
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );
    if (titleExists) {
      throw new UnprocessableEntityException(`post title already exists`);
    }
    // find the next id for a new blog post
    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;
    // Spread each object
    const blogPost: PostModel = {
      ...post,
      id,
    };
    this.posts.push(blogPost);
    return blogPost;
  }
  // delete post
  public delete(id: number): void {
    const index: number = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }
    this.posts.splice(index, 1);
  }
  // update post
  // update it with newly submitted data, and return the updated post
  public update(id: number, post: PostModel): PostModel {
    this.logger.log(`Updating post with id : ${id}`);
    const index: number = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }
    // checking exist title
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title && item.id !== post.id,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }
    const blogPost: PostModel = {
      ...post,
      id,
    };
    this.posts[index] = blogPost;
    return blogPost;
  }
}
