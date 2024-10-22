import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, SelectQueryBuilder } from '@mikro-orm/postgresql';

import { Todo } from '@/common/entities/todo.entity';
import { UpdateTodoDto } from './todos.dto';
import { ETodoPriority } from '@/common/enums/todo-priority.enum';

@Injectable()
export class TodoRepository extends EntityRepository<Todo> {
  async updateOne(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
    const foundTodo = await this.findOne({ id: id });
    if (!foundTodo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    this.assign(foundTodo, updateTodo);
    await this.getEntityManager().flush();
    return foundTodo;
  }

  async findAllFiltered(
    filterBy: string = '',
    priority: string = '',
    sortOrder: string = 'asc',
    dueDateSort: string = '',
    isCompleted: string = '',
  ): Promise<Todo[]> {
    const queryBuilder = this.createQueryBuilder('todo');

    if (filterBy === 'priority' && priority) {
      const priorityMap: { [key in keyof typeof ETodoPriority]: number } = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
      };

      const priorityKey = priority.toUpperCase() as keyof typeof priorityMap;
      queryBuilder.andWhere({ priority: priorityMap[priorityKey] });
    }

    if (isCompleted !== '') {
      const completed = isCompleted === 'true';
      queryBuilder.andWhere({ isCompleted: completed });
    }

    const orderByCriteria: any = {};

    if (filterBy === 'priority') {
      orderByCriteria['priority'] = sortOrder === 'desc' ? 'DESC' : 'ASC';
    }

    if (dueDateSort) {
      orderByCriteria['dueDate'] = dueDateSort === 'desc' ? 'DESC' : 'ASC';
    }

    orderByCriteria['isCompleted'] = 'ASC';
    orderByCriteria['createdAt'] = 'ASC';

    queryBuilder.orderBy(orderByCriteria);

    return await queryBuilder.getResult();
  }
}
