import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Todo } from '@/common/entities/todo.entity';

@Injectable()
export class TodoRepository extends EntityRepository<Todo> {}
