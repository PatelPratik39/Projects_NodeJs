

const getContacts = (req, res) => {
  res.json(200).json({ message: "GET ALL CONTACTS" });
};

const createConatct = (req, res) => {
  res.json(201).json({ message: "CREATE CONTACTS" });
};

const getContact = (req, res) => {
  res.json(200).json({ message: `GET CONTACTS ${req.params.id}` });
};

const updateConatct = (req, res) => {
  res.json(200).json({ message: `UPDATE CONTACTS ${req.params.id}` });
};

const deleteContacts = (req, res) => {
  res.json(200).json({ message: `DELETE CONTACTS ${req.params.id}` });
};

module.exports = {
  getContacts,
  createConatct,
  getContact,
  updateConatct,
  deleteContacts
};
