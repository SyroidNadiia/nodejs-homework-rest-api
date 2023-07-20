const { User } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");
const { createVerifyEmail, sendEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, `User not found`);
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendEmail;
