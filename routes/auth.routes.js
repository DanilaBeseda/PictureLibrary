const { Router } = require('express')
const router = Router()

const User = require('../models/User')

//auth/register
router.post('/register', async (req, res) => {
   try {
      const { email, password } = req.body

      const registeredUser = await User.findOne({ email })
      if (!registeredUser) {
         return res.status(400).json({ message: 'Такой пользователь уже есть в БД' })
      }

      const hashedPassword = await bcript.hash(password, 10, e => {
         if (err) {
            return res.status(500).json({ message: e.message })
         }
      })

      const user = new User({ email, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'Пользователь был создан' })
   } catch (e) {
      res.status(500).json({ message: e.message })
   }
})

router.post('/login', (req, res) => {

})

module.exports = router