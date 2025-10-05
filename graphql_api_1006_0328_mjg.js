// 代码生成时间: 2025-10-06 03:28:20
// 引入所需的库
const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

// 初始化数据库客户端
const prisma = new PrismaClient();

// 定义GraphQL类型
const typeDefs = `
  type Query {
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

// 定义解析器
const resolvers = {
  Query: {
    getUser: async (_, args) => {
      try {
        // 从数据库获取用户信息
        const user = await prisma.user.findUnique({
          where: { id: parseInt(args.id) },
        });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        // 错误处理
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },
  },
};

// 创建GraphQL服务器
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

// 启动服务器
server.start(() => {
  console.log('🚀 Server is running on http://localhost:4000');
});

// 确保在退出时关闭数据库连接
process.on('exit', () => {
  prisma.$disconnect();
});
