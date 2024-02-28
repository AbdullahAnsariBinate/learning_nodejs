const isRole = async (req, res, next) => {
  if (req.user.role == "admin") {
    return next();
  } else {
    res
      .status(401)
      .json({ message: "You're not an admin!", statusCode: false });
  }
};

module.exports = isRole;
