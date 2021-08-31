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

	Posts.associate = (models) => {
		Posts.hasMany(models.Comments, {
			onDelete: "cascade",
		});
	};

	Posts.associate = (models) => {
		Posts.hasMany(models.Likes, {
			onDelete: "cascade",
		});
	};

	return Posts;
};
