import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostModel } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // get posts service
  @Get()
  public findAll(): Array<PostModel> {
    return this.postsService.findAll();
  }
  // get decorator is used with parameter as Get(':id')
  // Param always return string, need to do a string to number conversion.
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): PostModel {
    return this.postsService.findOne(id);
  }
  // @Body decorator to parse the HTTP body
  // JSON.parse() on the HTTP body and provide us with a JSON object for controller.
  @Post()
  public create(@Body() post: PostModel): PostModel {
    return this.postsService.create(post);
  }
  // delete posts by id
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.delete(id);
  }
}
