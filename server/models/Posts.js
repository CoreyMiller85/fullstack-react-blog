module.exports = (sequalize, DataTypes) => {
	const Posts = sequalize.define("Posts", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postText: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Posts;
};