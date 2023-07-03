const service = require("../../service");

const create = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await service.createContact(req.body);

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
