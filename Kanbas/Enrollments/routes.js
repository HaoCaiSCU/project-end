import * as enrollmentsDao from './dao.js';

export default function EnrollmentsRoutes(app) {
  app.post('/api/enrollments', (req, res) => {
    const { userId, courseId } = req.body;
    enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.delete('/api/enrollments', (req, res) => {
    const { userId, courseId } = req.body;
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
      (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
    );
    res.sendStatus(200);
  });

  app.get('/api/courses', (req, res) => {
    const courses = coursesDao.findAllCourses();
    res.json(courses);
  });

  app.get('/api/enrollments/user/:userId', (req, res) => {
    const { userId } = req.params;
    const { enrollments } = enrollmentsDao.findEnrollmentsForUser(userId);
    res.status(200).json(enrollments);
  });
}

