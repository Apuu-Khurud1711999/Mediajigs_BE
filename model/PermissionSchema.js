const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  tabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tabs',
    required: true,
  },
  isView: {
    type: Boolean,
    default: false,
  },
  isAdd: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
