const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/User')

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const rank = Math.floor(Math.random() * 100) + 1
    res.json({
      success: true,
      data: {
        totalPosts: user.stats.totalPosts,
        totalReferrals: user.stats.totalReferrals,
        credits: user.credits,
        rank
      }
    })
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
