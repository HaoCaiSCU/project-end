import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';

// 路由模块引入
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from './Kanbas/Users/routes.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';

// 数据库连接
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('成功连接到 MongoDB 数据库'))
  .catch((err) => console.error('MongoDB 连接失败：', err));

// 初始化 Express 应用
const app = express();

// CORS 配置
const allowedOrigins = [
  'https://aesthetic-biscotti-eada72.netlify.app', // 允许的生产环境前端 URL
  'http://localhost:3000', // 本地开发前端 URL
];

app.use(
  cors({
    credentials: true, // 允许传递 Cookie
    origin: (origin, callback) => {
      // 动态检测来源是否在允许列表中
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('不被允许的跨域请求'));
      }
    },
  })
);

// Session 配置
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'kanbas', // 加密密钥
  resave: false, // 避免不必要的 session 保存
  saveUninitialized: false, // 禁止保存未初始化的 session
};

if (process.env.NODE_ENV !== 'development') {
  // 如果是生产环境，启用更多的安全选项
  sessionOptions.proxy = true; // 信任代理
  sessionOptions.cookie = {
    sameSite: 'none', // 跨站请求需要设置为 'none'
    secure: true, // 仅在 HTTPS 环境下传输 Cookie
    domain: process.env.NODE_SERVER_DOMAIN || undefined, // 指定 Cookie 的域名
  };
}

app.use(session(sessionOptions));

// JSON 中间件，解析请求体
app.use(express.json());

// 注册路由
UserRoutes(app);
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`服务器正在运行，监听端口：${PORT}`);
});
