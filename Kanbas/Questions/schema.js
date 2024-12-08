import mongoose from "mongoose";

const ChoiceSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
  }
});

const QuestionSchema = new mongoose.Schema({
  quiz_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['fill_in_blanks', 'multiple_choice', 'true_false'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: false,
  },
  possible_answers: {
    type: [String],
    required: function() { return this.type === 'fill_in_blanks'; }
  },
  choices: {
    type: [ChoiceSchema],
    required: function() { return this.type === 'multiple_choice'; }
  },
  is_true: {
    type: Boolean,
    required: function() { return this.type === 'true_false'; }
  }
  },
  { collection: "questions" }
);

export default QuestionSchema;