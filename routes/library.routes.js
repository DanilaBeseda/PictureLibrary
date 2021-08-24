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

router.delete('/:id', auth, async (req, res) => {
   try {
      await Picture.deleteOne({ _id: req.params.id })
      res.json({ message: 'Picture has been deleted' })
   } catch (e) {
      res.status(500).json({ message: e.message })
   }
})

router.patch('/', auth, (req, res) => {
   try {
      req.body.forEach(async item => {
         await Picture.updateOne({ _id: item._id }, { name: item.name })
      })
      res.json({ message: 'Pictures has been updated' })
   } catch (e) {
      res.status(500).json({ message: e.message })
   }
})

module.exports = router