import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  app.post("/api/quizzes/:quizid", async (req, res) => {
    try {
      const { quizid } = req.params;
      const newQuestion = {
        quiz_id: quizid,
        ...req.body,
      };
      const createdQuestion = await dao.createQuestion(newQuestion);
      res.status(201).json(createdQuestion);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  });

  app.get("/api/quizzes/:quizid/questions", async (req, res) => {
    try {
      const { quizid } = req.params;
      const questions = await dao.findQuestionsByQuizId(quizid);
      res.json(questions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

  app.get("/api/questions/:questionid", async (req, res) => {
    try {
      const { questionid } = req.params;
      const question = await dao.findQuestion(questionid);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

  app.delete("/api/questions/:questionid", async (req, res) => {
    try {
      const { questionid } = req.params;
      const status = await dao.deleteQuestion(questionid);
      status.deletedCount
        ? res.json(status)
        : res.status(404).json({ message: "Question not found" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

  app.put("/api/questions/:questionid", async (req, res) => {
    try {
      const { questionid } = req.params;
      const updatedQuestion = await dao.updateQuestion(questionid, req.body);
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update question", error: error.message });
    }
  });
}