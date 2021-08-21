const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Picture = require('../models/Picture')
const router = Router()

router.post('/', auth, async (req, res) => {
   try {
      const { name, url } = req.body

      const picture = new Picture({ name, url, userId: req.user.userId })
      await picture.save()

      res.status(201).json({ message: 'Object created' })
   } catch (e) {
      res.status(500).json({ message: e.message })
   }
})

module.exports = router