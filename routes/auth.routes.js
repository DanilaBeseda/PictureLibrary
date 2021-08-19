const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

const User = require('../models/User')

//auth/signup
router.post('/signup', async (req, res) => {
   try {
      const { email, password } = req.body

      const registeredUser = await User.findOne({ email })
      if (registeredUser) {
         return res.status(400).json({ message: 'This user already exists in the database' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new User({ email, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'User created' })
   } catch (e) {
      res.status(500).json({ message: e.message })
   }
})

//auth/signin
router.post('/signin', async (req, res) => {
   try {
      const { email, password } = req.body

      const registeredUser = await User.findOne({ email })
      if (!registeredUser) {
         return res.status(400).json({ message: 'User is not found' })
      }

      const isMatch = bcrypt.compare(password, registeredUser.password)
      if (!isMatch) {
         return res.status(400).json({ message: 'Incorrect data' })
      }

      const token = jwt.sign({ userId: registeredUser._id }, config.get('jwtSecret'), { expiresIn: '1h' })

      res.json({ token, userId: registeredUser._id })

   } catch (e) {
      res.status(500).json({ message: e.message })
   }
})

module.exports = router