const next = require('next')
const Koa = require('koa')

const port = process.env.PORT || 3000
const dev =  process.env.NODE_ENV === 'development'
const dir = './src'
const app = next({ dev, dir })
const routes = require('./routes')(app)

app.prepare().then(() => {
  const server = new Koa();

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(routes)

  server.listen(port)
  console.log(`> Server is up. Listening on port ${ port }.`)
})