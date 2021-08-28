module.exports = (sequalize, DataTypes) => {
	const Comments = sequalize.define("Comments", {
		commentBody: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Comments;
};
