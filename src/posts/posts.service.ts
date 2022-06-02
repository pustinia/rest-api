import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PostModel } from './posts.interface';

@Injectable()
export class PostsService {
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
      throw new UnprocessableEntityException('post title already exists');
    }
    // find the next id for a new blog post
    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;
    const blogPost: PostModel = {
      ...post,
      id,
    };
    this.posts.push(blogPost);
    return blogPost;
  }
}
