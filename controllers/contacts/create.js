const service = require("../../service");

const create = async (req, res, next) => {
  const { value } = req.body;
  try {
    const result = await service.createContact(value);

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
