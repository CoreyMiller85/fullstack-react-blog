const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");

router.post("/", async (req, res) => {
	const { username, password } = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		Users.create({
			username: username,
			password: hash,
		});
	});
	res.json("Success");
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await Users.findOne({
		where: {
			username: username,
		},
	});
	if (!user) {
		res.json({ error: "Incorrect User" });
	} else {
		bcrypt.compare(password, user.password).then((match) => {
			if (!match)
				res.json({ error: "Wrong username and password combination" });
			res.json({
				message: "You are logged in.",
			});
		});
	}
});

module.exports = router;
