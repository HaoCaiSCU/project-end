import model from "./model.js";
export function findAllCourses() {
  
  return model.find();
}
export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }

export function createCourse(course) {
  delete course._id;
  return model.create(course);
 
}


  export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
   }
   
  
export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
}
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user); 
}
  