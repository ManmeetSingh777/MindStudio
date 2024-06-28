const express = require('express');
const Faq = require('../models/Faq');
const router = express.Router();
const passport = require('passport');
const { isAdmin } = require('../middleware/admin');

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a FAQ
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  const faq = new Faq({
    question: req.body.question,
    answer: req.body.answer,
  });
  try {
    const newFaq = await faq.save();
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a FAQ
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    faq.question = req.body.question || faq.question;
    faq.answer = req.body.answer || faq.answer;
    const updatedFaq = await faq.save();
    res.json(updatedFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a FAQ
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    await faq.remove();
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
