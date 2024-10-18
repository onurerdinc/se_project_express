const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weatherType, imageUrl, ownerId } = req.body;

  if (!name || !weatherType || !imageUrl || !ownerId) {
    return res.status(BAD_REQUEST).send({
      message: "All fields (name, weatherType, imageUrl, ownerId) are required",
    });
  }

  const newItem = new ClothingItem({ name, weatherType, imageUrl, ownerId });

  newItem
    .save()
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((deletedItem) => {
      return deletedItem.remove();
    })
    .then(() => res.status(204).send())
    .catch((err) => {
      console.error(`Error ${err.name}: ${err.message}`);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }

      if (err.message === "Item ID not found") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
