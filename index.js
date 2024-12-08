import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';

import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from './Kanbas/Users/routes.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import QuestionRoutes from "./Kanbas/Questions/routes.js";
import AttemptRoutes from "./Kanbas/Attempts/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Linking MongoDB succeed'))
  .catch((err) => console.error('Linking MongoDB failed：', err));

const app = express();

const allowedOrigins = [
  'https://aesthetic-biscotti-eada72.netlify.app', 
  'http://localhost:3000',
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Disallowed cross-origin request'));
      }
    },
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'kanbas',
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN || undefined, 
  };
}

app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
AttemptRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`The server is running and listening on the port：${PORT}`);
});
