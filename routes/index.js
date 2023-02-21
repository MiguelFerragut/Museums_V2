module.exports = app => {

    const indexRouter = require("./index.routes")
    app.use("/", indexRouter)

    const authRouter = require('./auth.routes')
    app.use('/', authRouter)

    const usersRouter = require('./users.routes')
    app.use('/users', usersRouter)

    const museumsRouter = require('./museums.routes')
    app.use('/museums', museumsRouter)

    const eventsRouter = require('./events.routes')
    app.use('/events', eventsRouter)
}