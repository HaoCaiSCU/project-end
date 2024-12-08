import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    try {
      const { cid } = req.params;
      const newQuiz = {
        course: cid,
        ...req.body,
      };
      await dao.createQuiz(newQuiz);
      res.status(201).json(newQuiz);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  });

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    try {
      const { cid } = req.params;
      const quizzes = await dao.findAllQuizzes(cid);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/courses/:cid/quizzes/:qid", async (req, res) => {
    try {
      const { cid } = req.params;
      const { qid } = req.params;
      const quiz = await dao.findQuiz(qid);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    try {
      const { qid } = req.params;
      const status = await dao.deleteQuiz(qid);
      status.deletedCount
        ? res.json(status)
        : res.status(404).json({ message: "Quiz not found" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    try {
      const { qid } = req.params;
      await dao.updateQuiz(qid, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to update quiz" });
    }
  });

  app.put("/api/quizzes/:qid/points", async (req, res) => {
    try {
      const { qid } = req.params;
      const { points } = req.body;
      await dao.updateQuizPoints(qid, points);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update quiz points" });
    }
  });
}