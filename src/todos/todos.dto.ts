import { ETodoPriority } from '@/common/enums/todo-priority.enum';
import { Type } from 'class-transformer';

import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty({ message: 'Due date is required.' })
  @IsDate()
  @Type(() => Date)
  dueDate!: Date;

  @IsNotEmpty()
  @IsEnum(ETodoPriority)
  priority!: ETodoPriority;

  isCompleted: boolean = false;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @IsOptional()
  @IsEnum(ETodoPriority)
  priority?: ETodoPriority;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
