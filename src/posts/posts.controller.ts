import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { PostModel } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('posts')
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // get posts service
  @Get()
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  public findAll(): Array<PostModel> {
    return this.postsService.findAll();
  }

  // get decorator is used with parameter as Get(':id')
  // Param always return string, need to do a string to number conversion.
  @Get(':id')
  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public findOne(@Param('id', ParseIntPipe) id: number): PostModel {
    return this.postsService.findOne(id);
  }

  // @Body decorator to parse the HTTP body
  // JSON.parse() on the HTTP body and provide us with a JSON object for controller.
  @Post()
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public create(@Body() post: PostModel): PostModel {
    return this.postsService.create(post);
  }

  // delete posts by id
  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.delete(id);
  }

  // update post by id
  @Put(':id')
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.1' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: PostModel,
  ): PostModel {
    return this.postsService.update(id, post);
  }
}
