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
import { PostsService } from './posts.service';
import { Posts } from './posts.entity'; // 여기서 dto, dao를 나눠야 하나?
import { CommonModel } from 'src/common/common.model';

@Controller('posts')
@ApiTags('posts')
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // get posts service
  @Get()
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  public findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  // get decorator is used with parameter as Get(':id')
  // Param always return string, need to do a string to number conversion.
  @Get(':id')
  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  // @Body decorator to parse the HTTP body
  // JSON.parse() on the HTTP body and provide us with a JSON object for controller.
  @Post()
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public create(@Body() post: Posts): Promise<Posts> {
    return this.postsService.create(post);
  }

  // delete posts by id
  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): Promise<CommonModel> {
    return this.postsService.delete(id);
  }

  // update post by id
  @Put(':id')
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.1' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: Posts,
  ): Promise<CommonModel> {
    return this.postsService.update(id, post);
  }
}
