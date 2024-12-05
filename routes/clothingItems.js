const express = require("express");

const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

const {
  validateItemId,
  validateCardBody,
} = require("../middlewares/validation");

router.post("/", auth, validateCardBody, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", validateItemId, auth, likeItem);

router.delete("/:itemId", validateItemId, auth, deleteItem);

router.delete("/:itemId/likes", validateItemId, auth, unlikeItem);

module.exports = router;
