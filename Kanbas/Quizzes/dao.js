import model from "./model.js";

export const createQuiz = (quiz) => {
  delete quiz._id;
  return model.create(quiz);
};

export const findAllQuizzes = (courseId) => model.find({ course: courseId });
export const findQuiz = (quizId) => model.findOne({ _id: quizId });

export const updateQuiz = async (quizId, quiz) => {
  if (quiz.title) {
    await model.updateOne({ _id: quizId }, { $set: quiz });
    return "Quiz updated successfully";
  } else {
    throw new Error("Quiz does not meet requirements");
  }
};

export const updateQuizPoints = async (quizId, points) => {
  if (points) {
    await model.updateOne({ _id: quizId }, { $set: { points } });
    return "Quiz points updated successfully";
  } else {
    throw new Error("Points are required");
  }
};

export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });