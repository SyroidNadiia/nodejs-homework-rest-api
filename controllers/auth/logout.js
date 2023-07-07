const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
      status: "success",
      code: 204,
      data: { message: "No Content" },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = logout;