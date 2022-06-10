import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Posts {
  // @PrimaryColumn() creates a primary column which takes any value of any type.
  // @PrimaryGeneratedColumn() creates a primary column which value will be automatically generated with an auto-increment value.
  @PrimaryGeneratedColumn()
  @ApiPropertyOptional({ type: Number })
  id?: number;

  @ApiProperty({ type: String, format: 'date-time' })
  @Column()
  date: Date;

  @ApiProperty({ type: String })
  @Column()
  title: string;

  @ApiProperty({ type: String })
  @Column()
  body: string;

  @ApiProperty({ type: String })
  @Column()
  category: string;

  @Column({ default: true })
  isActive: boolean;
}
