import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    course: { type: String },
    title: { type: String, default: "Default Quiz Title" },
    status: { type: Boolean, default: false },
    quiz_instructions: { type: String, default: "" },
    quiz_type: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    points: { type: Number, default: 0 },
    assignment_group: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffle_answers: { type: Boolean, default: true },
    time_limit: { type: Number, default: 20 },
    multiple_attempts: { type: Boolean, default: false },
    how_many_attempts: { type: Number, default: 1 },
    show_correct_answers: {
      type: String,
      enum: ["Always", "After Due Date", "Never"],
      default: "Never",
    },
    access_code: { type: String, default: "" },
    one_question_at_a_time: { type: Boolean, default: true },
    webcam_required: { type: Boolean, default: false },
    lock_questions_after_answering: { type: Boolean, default: false },
    due_date: { type: Date, default: Date.now },
    available_date: { type: Date, default: Date.now },
    until_date: { type: Date, default: Date.now },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { collection: "quizzes" }
);

export default quizSchema;