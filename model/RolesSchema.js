const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
