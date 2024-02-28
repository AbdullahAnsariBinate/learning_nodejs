const { default: Article } = require("../modals/Article");

const createArticle = async (req, res) => {
  try {
    const id = req.user.id;
    // console.log(id)
    const {
      title,
      content,
      category,
      description,
      tags,
      rating,
      Keyword,
      readingMinutes,
    } = req.body;

    const User = await UserAttribute.findOne({ _id: id });

    if (User) {
      const article = new Article({
        id,
        title,
        content,
        category,
        description,
        tags,
        image: req.file.path,
        rating,
        userId: User._id,
        Keyword,
        readingMinutes,
      });

      await article.save();
      console.log(article);
      const words = convertToWords(readingMinutes);
      return res.status(201).json({
        message: "article added successfully",
        readingMinutes: words,
      });
    }

    return res.status(400).json({
      message: "Invalid User",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { createArticle };
