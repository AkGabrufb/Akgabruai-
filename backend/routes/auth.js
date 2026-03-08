const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/google', async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body
    let user = await User.findOne({ googleId })
    if (!user) {
      user = await User.findOne({ email })
      if (user) {
        user.googleId = googleId
        user.picture = picture
        await user.save()
      } else {
        user = new User({ googleId, email, name, picture })
        await user.save()
      }
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        referralCode: user.referralCode,
        credits: user.credits
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' })
  }
})

router.get('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ success: false })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({ success: false })
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        referralCode: user.referralCode,
        credits: user.credits
      }
    })
  } catch {
    res.status(401).json({ success: false })
  }
})

module.exports = router
