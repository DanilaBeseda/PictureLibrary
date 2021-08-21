const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
   const token = req.headers.authorization.split(' ')[1]  // "Bearer TOKEN"
   try {
      if (!token) {
         return res.status(401).json({ message: 'Unauthorized user' })
      }

      const decoded = jwt.verify(token, config.get('jwtSecret'))
      req.user = decoded
      next()
   } catch (e) {
      res.status(500).json({ message: e.message })
   }
}

module.exports = auth