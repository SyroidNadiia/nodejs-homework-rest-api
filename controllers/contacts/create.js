const { Contact } = require("../../models/contact");

const create = async (req, res, next) => {
  try {
       const { _id: owner } = req.user;
    console.log(owner);
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = create;
