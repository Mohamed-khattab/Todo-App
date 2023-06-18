const { v4: uuid } = require('uuid');
const { prisma } = require('../utils/db');

class TodoRecord {
  constructor(obj) {
    if (!obj.todo || obj.todo.length < 3 || obj.todo.length > 50) {
      throw new Error(
        'Todo must have at least 3 characters and less than 50 characters'
      );
    }

    this.id = obj.id;
    this.todo = obj.todo;
  }

  static async listAll() {
    const todos = await prisma.todo.findMany();
    return todos.map((obj) => new TodoRecord(obj));
  }

  static async getOne(id) {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    return todo ? new TodoRecord(todo) : null;
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }

    const createdTodo = await prisma.todo.create({
      data: {
        id: this.id,
        todo: this.todo,
      },
    });

    return createdTodo.id;
  }

  async update(id, todo) {
    await prisma.todo.update({
      where: { id },
      data: {
        todo,
      },
    });
  }

  async delete() {
    await prisma.todo.delete({
      where: { id: this.id },
    });
  }
}

module.exports = {
  TodoRecord,
};
