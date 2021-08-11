// MongoDB
    const mongoose = require('mongoose')
    const db = require('./config/keys').mongoURI

    mongoose
        .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('mongo connected!')
        })
        .catch(err => console.log(err))

// Express
    const express = require('express')
    const app = express()

    const expressLayouts = require('express-ejs-layouts')
    app.use(expressLayouts)
    app.set('view engine', 'ejs')

    app.use(express.urlencoded({extended: false}))

    const session = require('express-session')

    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }))

    const passport = require('passport')
    require('./config/passport')(passport)

    app.use(passport.initialize())
    app.use(passport.session())

    const flash = require('connect-flash')

    app.use(flash())

    app.use((req, res, next) => {
        res.locals._success = req.flash('_success')
        res.locals._error = req.flash('_error')
        res.locals.error = req.flash('error')
        next()
    })

    app.use('/', require('./routes/index'))
    app.use('/users', require('./routes/users'))

    app.listen(process.env.PORT || 5680)