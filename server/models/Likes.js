module.exports = (sequalize, DataTypes) => {
	const Likes = sequalize.define("Likes");

	return Likes;
};
