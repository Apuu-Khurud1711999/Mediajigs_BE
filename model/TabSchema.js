const mongoose = require('mongoose');

const tabsSchema = new mongoose.Schema({
  tabName: {
    type: String,
    required: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
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
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Tabs = mongoose.model('Tabs', tabsSchema);

module.exports = Tabs;
