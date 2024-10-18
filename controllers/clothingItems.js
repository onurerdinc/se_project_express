const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weatherType, imageUrl, ownerId } = req.body;

  if (!name || !weatherType || !imageUrl || !ownerId) {
    return res.status(400).send({
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
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((deletedItem) => {
      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
