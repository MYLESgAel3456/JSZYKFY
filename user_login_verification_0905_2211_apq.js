// 代码生成时间: 2025-09-05 22:11:07
// 定义一个用户模型，用于存储用户名和密码
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

// 用户登录验证系统
class LoginSystem {
    constructor() {
        // 存储用户信息
        this.users = [];
    }

    // 注册新用户
    registerUser(username, password) {
        // 检查用户名是否已存在
        const existingUser = this.users.find(user => user.username === username);
        if (existingUser) {
            throw new Error('用户名已存在');
        }

        // 创建新用户并添加到用户列表
        const newUser = new User(username, password);
        this.users.push(newUser);
        console.log('用户注册成功');
    }

    // 用户登录
    loginUser(username, password) {
        // 查找用户名对应的用户
        const user = this.users.find(user => user.username === username);

        // 检查用户是否存在
        if (!user) {
            throw new Error('用户不存在');
        }

        // 检查密码是否正确
        if (user.password !== password) {
            throw new Error('密码错误');
        }

        console.log('用户登录成功');
    }
}

// 示例：创建登录系统实例并进行用户注册和登录
const loginSystem = new LoginSystem();

try {
    // 注册新用户
    loginSystem.registerUser('JohnDoe', 'password123');
    loginSystem.registerUser('JaneDoe', 'password456');

    // 用户登录
    loginSystem.loginUser('JohnDoe', 'password123'); // 正确密码
    loginSystem.loginUser('JohnDoe', 'wrongpassword'); // 错误密码

    // 注册已存在的用户名
    loginSystem.registerUser('JohnDoe', 'newpassword123'); // 应抛出错误
} catch (error) {
    console.error(error.message);
}