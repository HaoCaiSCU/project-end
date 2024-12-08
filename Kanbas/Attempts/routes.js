import * as dao from "./dao.js";

export default function AttemptRoutes(app) {
    // 收到一个新的attempt，计算分数，保存并返回包含分数的attempt
    app.post("/api/quizzes/:qid/newAttempt", async (req, res) => {
        try {
            const attempt = req.body;
            if (!Array.isArray(attempt.answers)) {
                throw new Error('Invalid data format: answers should be an array');
            }
            attempt.answers.forEach(answer => {
                if (!Array.isArray(answer.blanks)) {
                    // 打印blanks
                    console.log(answer.blanks);
                    throw new Error('Invalid data format: blanks should be an array');
                }
            });
            const newAttempt = await dao.createAttempt(attempt);
            res.json(newAttempt);
        } catch (error) {
            console.error('Error creating attempt:', error.message);
            res.status(500).send(error.message);
        }
    }
    );

    // 得到特定quiz特定user的所有attempts
    app.get("/api/quizzes/:qid/attempts", async (req, res) => {
        try {
            const userId = req.body;
            const quizId = req.params.qid;
            const attempts = await dao.findAllAttempts(userId, quizId);
            res.json(attempts);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    );

    // 得到特定quiz的attempts数量
    app.get("/api/quizzes/:qid/attempts/number", async (req, res) => {
        try {
            const { userId } = req.query;
            const quizId = req.params.qid;
            const attempts = await dao.findAllAttempts(userId, quizId);
            const count = attempts.length;
            res.json({ count });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    );

    // 得到特定attempt
    app.get("/api/attempts/:aid", async (req, res) => {
        try {
            const attemptId = req.params.aid;
            const attempt = await dao.findAttempt(attemptId);
            res.json(attempt);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    );

    // 得到某个quiz某个user最新的attempt
    app.get("/api/quizzes/:qid/attempts/latest", async (req, res) => {
        try {
            const { userId } = req.query;
            if (!userId) {
                throw new Error('UserId is required');
              }
            const quizId = req.params.qid;
            const attempts = await dao.findAllAttempts(userId, quizId);
            const latestAttempt = attempts.sort((a, b) => b.created_at - a.created_at)[0];
            res.json(latestAttempt);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    );
}