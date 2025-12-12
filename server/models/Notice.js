const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'General / Company-Wide',
      'Holiday & Event',
      'HR & Policy Update',
      'Finance & Payroll',
      'IT / System Maintenance',
      'Department / Team',
      'Warning / Disciplinary',
      'Emergency / Urgent'
    ]
  },
  target: {
    type: {
      type: String, // 'Department' or 'Individual'
      required: true,
      enum: ['Department', 'Individual']
    },
    value: {
      type: String, // e.g., 'Finance', 'All Department' or specific name/ID if needed, but per design usually just 'Individual' label + details below
      required: true
    }
  },
  // Details if target is Individual
  employeeDetails: {
    employeeId: String,
    name: String,
    position: String,
  },
  body: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Published', 'Unpublished', 'Draft'],
    default: 'Published'
  },
  attachment: {
    type: String, // URL or local path
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Notice', NoticeSchema);
