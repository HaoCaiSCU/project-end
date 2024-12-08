import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true,
  },
  blanks: {
    type: [String],
    required: false,
  },
  choice: {
    type: String,
    required: false,
  },
  is_true: {
    type: Boolean,
    required: false,
  }
});

const AttemptSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  quiz_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  answers: {
    type: [AnswerSchema],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
}, { collection: 'attempts' });

export default AttemptSchema;