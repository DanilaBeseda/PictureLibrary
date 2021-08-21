const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json())

app.use('/auth', require('./routes/auth.routes'))
app.use('/library', require('./routes/library.routes'))
app.use('/addpicture', require('./routes/addPicture.routes'))

const PORT = config.get('port') || 5000

async function start() {
   try {
      await mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

      app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}...`)
      })
   } catch (e) {
      console.error(e)
      process.exit(1)
   }

}

start()