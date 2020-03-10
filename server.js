const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

const auth = require('./middleware/auth')
const connectDB = require('./config/db')

const app = express()

// Database
connectDB()

// Middleware
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Routes
app.use('/admin', auth, require('./routes/admin'))
app.use('/api', require('./routes/api'))

// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(process.env.PORT || 3000, console.log('Server started on port 3000'))
