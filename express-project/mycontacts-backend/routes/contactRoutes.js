const express = require("express");
const router = express.Router();
const {
  getContacts,
  createConatct,
  getContact,
  updateConatct,
  deleteContacts
} = require("../controllers/contactControllers");

router.route("/").get(getContacts).get(createConatct);

router.route("/:id").post(getContact).put(updateConatct).delete(deleteContacts);

module.exports = router;
