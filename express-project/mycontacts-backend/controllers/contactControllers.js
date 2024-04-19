const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  console.log("The Request Body : ", req.body);
  //   destructuring
  const { name, email, phone } = req.body;
  if ((!name, !email, !phone)) {
    res.status(400);
    throw new Error("All Fields are Mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone
  });

  res.status(201).json(contact);
  //   res.status(201).json({ message: "CREATE CONTACTS" });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Conatct Not Found!!");
  }
  //   res.status(200).json({ message: `GET CONTACTS ${req.params.id}` });
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Conatct Not Found!!");
  }
  const updatedConatct = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  //   res.status(200).json({ message: `UPDATE CONTACTS ${req.params.id}` });
  res.status(200).json(updatedConatct);
});
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

// const deleteContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Conatct Not Found!!");
//   }
//   await Contact.remove();
//   res.status(200).json(contact);
// });

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
};
