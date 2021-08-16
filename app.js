const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()



const PORT = config.get('port') || 5000

async function start() {
   try {
      await mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true, useUnifiedTopology: true })

      app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}...`)
      })
   } catch (e) {
      console.error(e)
      process.exit(1)
   }

}

start()