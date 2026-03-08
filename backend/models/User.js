const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  picture: String,
  referralCode: { type: String, unique: true },
  credits: { type: Number, default: 100 },
  trialEnd: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 },
  stats: {
    totalPosts: { type: Number, default: 0 },
    totalReferrals: { type: Number, default: 0 }
  }
})
userSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = 'IUAI' + Math.random().toString(36).substring(2, 10).toUpperCase()
  }
  next()
})
module.exports = mongoose.model('User', userSchema)
