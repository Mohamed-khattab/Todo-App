const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'mysql://username:password@localhost:3306/todolist',
    },
  },
});

module.exports = {
  prisma,
};
