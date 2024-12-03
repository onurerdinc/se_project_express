const ClothingItem = require("../models/clothingItems");
const { BadRequestError } = require("../utils/errors/BadRequestError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { InternalServerError } = require("../utils/errors/InternalServerError");
const { ForbiddenError } = require("../utils/errors/ForbiddenError");

const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(
        new InternalServerError("An error occurred while creating the item")
      );
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return next(
        new InternalServerError("An error occurred while fetching items")
      );
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(
          new ForbiddenError("You are not authorized to delete this item")
        );
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully" })
        );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(
        new InternalServerError("An error occurred while deleting the item")
      );
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(
        new InternalServerError("An error occurred while liking the item")
      );
    });
};

const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(() => res.status(200).send({ message: "Item unliked successfully" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(
        new InternalServerError("An error occurred while unliking the item")
      );
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
