import Database from "../Database/index.js";
export function findCoursesForUser(userId) {
  const { enrollments } = Database.users.find((u) => u._id === userId);
  if (enrollments) {
    return user.courses;
  } else {
    return [];
  }
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database.users.find((u) => u._id === userId);
  if (enrollments) {
    user.courses = user.courses.filter((id) => id !== courseId);
  }
  return user;
}


