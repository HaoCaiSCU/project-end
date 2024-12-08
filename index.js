import mongoose from "mongoose";
import express from 'express';
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import QuestionRoutes from "./Kanbas/Questions/routes.js";
import AttemptRoutes from "./Kanbas/Attempts/routes.js";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

const app = express();

// 设置允许的前端来源
const allowedOrigins = [
  "https://tranquil-heliotrope-667438.netlify.app", // 前端生产环境
  "http://localhost:3000", // 本地开发环境
];

// 配置 CORS 中间件
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // 允许访问
      } else {
        callback(new Error("Not allowed by CORS")); // 拒绝访问
      }
    },
    credentials: true, // 允许携带 Cookie 和认证信息
  })
);

// 配置 Express session
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

// 配置其他中间件
app.use(express.json());

// 注册路由
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
AttemptRoutes(app);

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
