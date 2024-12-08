import AttemptModel from './model.js';
import { findQuestion } from '../Questions/dao.js';

export const createAttempt = (attempt) => {
    delete attempt._id;
    if (!Array.isArray(attempt.answers)) {
        throw new Error('Invalid data format: answers should be an array');
    }
    // attempt.score = countScore(attempt.answers);
    return AttemptModel.create(attempt);
};

export const findAllAttempts = (userId, quizId) => AttemptModel.find({ 
    user_id: userId, 
    quiz_id: quizId 
});

// export const countScore = (answers) => {
//     let score = 0;
//     answers.forEach(answer => {
//         const question = findQuestion(answer.question_id);
//         console.log("counting score for question:" + question + question.type);
//         switch (question.type) {
//             case "multiple_choice":
//                 const correct_choice = question.choices.find(choice => choice.correct); // 正确选项的string
//                 if (correct_choice.answer === answer.choice) {
//                     score += question.points;
//                 };
//                 break;
//             case "true_false":
//                 if (question.is_true === answer.is_true) {
//                     score += question.points;
//                 };
//                 break;
//             case "fill_in_blanks":
//                 if (Array.isArray(answer.blanks)) {
//                     question.possible_answers.forEach((possible_answer, index) => {
//                         if (possible_answer === answer.blanks[index]) {
//                             score += question.points / question.possible_answers.length;
//                         }
//                     });
//                 };
//                 break;
//             default:
//                 break;
//         }
//     });
//     return score;
// }

export const findAttempt = (attemptId) => AttemptModel.findOne
    ({ _id: attemptId });

export const deleteAttempt = (attemptId) => AttemptModel.delete({ _id: attemptId });