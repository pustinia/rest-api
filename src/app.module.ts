import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DataSource } from 'typeorm';
import { Posts } from './posts/posts.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      // https://typeorm.io/data-source-options#postgres--cockroachdb-data-source-options
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Posts],
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // The TypeORM DataSource and EntityManager objects will be available to inject across the entire project
  // (without needing to import any modules)
  constructor(private dataSource: DataSource) {}
}
