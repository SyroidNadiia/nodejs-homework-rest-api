const { User } = require("../../models/user");
const createError = require("http-errors");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404, `User not found`);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification successful",
    },
  });
};

module.exports = verify;
