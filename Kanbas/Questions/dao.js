import model from "./model.js";

export const createQuestion = (question) => {
  delete question._id;
  return model.create(question);
};

export const findQuestion = (questionId) => {
  return model.findOne({ _id: questionId });
};

export const findQuestionsByQuizId = (quizId) => {
  return model.find({ quiz_id: quizId });
};

export const updateQuestion = async (questionId, question) => {
  return model.updateOne({ _id: questionId }, { $set: question });
};

export const deleteQuestion = (questionId) => {
  return model.deleteOne({ _id: questionId });
};