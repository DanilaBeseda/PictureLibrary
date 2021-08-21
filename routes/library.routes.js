const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Picture = require('../models/Picture')
const router = Router()

router.get('/', auth, async (req, res) => {
   try {
      const data = await Picture.find({ userId: req.user.userId })
      res.json(data)
   } catch (e) {
      res.status(500).json({ message: e.message })
   }
})

module.exports = router