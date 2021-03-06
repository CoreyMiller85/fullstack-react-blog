const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/:postId", async (req, res) => {
	const postId = req.params.postId;
	const post = await Comments.findAll({ where: { PostId: postId } });
	res.json(post);
});

router.post("/", validateToken, async (req, res) => {
	const comment = req.body;
	const username = req.user.username;
	comment.username = username;
	await Comments.create(comment);
	res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
	const commentId = req.params.commentId;
	Comments.destroy({
		where: {
			id: commentId,
		},
	});
	res.json("Deleted");
});

module.exports = router;
