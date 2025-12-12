const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Notice = require('../models/Notice');

// In-memory fallback store
let mockNotices = [];

// Helper to check DB status
const isDbConnected = () => mongoose.connection.readyState === 1;

// GET all notices
router.get('/', async (req, res) => {
    try {
        if (isDbConnected()) {
            const { status, target } = req.query;
            let query = {};
            if (status) query.status = status;
            const notices = await Notice.find(query).sort({ publishDate: -1 });
            return res.json(notices);
        }
        res.json(mockNotices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single notice
router.get('/:id', async (req, res) => {
    try {
        if (isDbConnected()) {
            const notice = await Notice.findById(req.params.id);
            if (!notice) return res.status(404).json({ message: 'Notice not found' });
            return res.json(notice);
        }
        const notice = mockNotices.find(n => n._id === req.params.id);
        if (!notice) return res.status(404).json({ message: 'Notice not found' });
        res.json(notice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create notice
router.post('/', async (req, res) => {
    const { title, type, target, employeeDetails, body, publishDate, status, attachment } = req.body;

    const noticeData = {
        title, type, target, employeeDetails, body, publishDate, status, attachment
    };

    try {
        if (isDbConnected()) {
            const notice = new Notice(noticeData);
            const newNotice = await notice.save();
            return res.status(201).json(newNotice);
        }
        const newNotice = { ...noticeData, _id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
        mockNotices.unshift(newNotice);
        res.status(201).json(newNotice);
    } catch (err) {
        console.error('Create Notice Error:', err);
        res.status(400).json({ message: err.message, error: err });
    }
});

// PUT update notice
router.put('/:id', async (req, res) => {
    try {
        if (isDbConnected()) {
            const updatedNotice = await Notice.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedNotice) return res.status(404).json({ message: 'Notice not found' });
            return res.json(updatedNotice);
        }
        const index = mockNotices.findIndex(n => n._id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Notice not found' });

        mockNotices[index] = { ...mockNotices[index], ...req.body, updatedAt: new Date() };
        res.json(mockNotices[index]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE delete notice
router.delete('/:id', async (req, res) => {
    try {
        if (isDbConnected()) {
            const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
            if (!deletedNotice) return res.status(404).json({ message: 'Notice not found' });
            return res.json({ message: 'Notice deleted successfully' });
        }
        const index = mockNotices.findIndex(n => n._id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Notice not found' });

        mockNotices.splice(index, 1);
        res.json({ message: 'Notice deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
