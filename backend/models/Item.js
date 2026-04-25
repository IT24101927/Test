const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    supplierName: {
      type: String,
      trim: true,
      default: ''
    }

    // LAB TEST PRACTICE:
    // Add your new field here, for example:
    // supplierName: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
