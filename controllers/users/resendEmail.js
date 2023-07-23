const { User } = require("../../models/user");
const { createVerifyEmail, sendEmail, HttpError } = require("../../helpers");

const { nanoid } = require("nanoid");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, `User not found`);
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const newVerificationToken = nanoid();
  user.verificationToken = newVerificationToken;
  await user.save();

  const verifyEmail = createVerifyEmail(newVerificationToken, email);
  await sendEmail(verifyEmail);

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendEmail;
