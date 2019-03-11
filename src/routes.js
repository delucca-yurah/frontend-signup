const Router = require('koa-router')
const PassThrough = require('stream').PassThrough
const request = require('request')
const router = new Router();

const _proxyFile = ({ ctx, url, type }) => {
  ctx.set('Content-Type', type);
  ctx.body = request(url).pipe(PassThrough());
}

const routes = app => {
  const handle = app.getRequestHandler()

  router.get('/robots.txt', ctx =>
    _proxyFile(
      {
        ctx,
        url: 'https://yurah.com.br/static/robots.txt',
        type: 'text/plain'
      }
    )
  )

  // Analytics proof of ownership, remove after conclusion
  router.get('/analytics.txt', ctx =>
    _proxyFile(
      {
        ctx,
        url: 'https://yurah.com.br/static/analytics.txt',
        type: 'text/plain'
      }
    )
  )

  router.get('/sitemap.xml', ctx =>
    _proxyFile(
      {
        ctx,
        url: process.env.SITEMAP_URL,
        type: 'application/xml'
      }
    )
  )

  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query)
    ctx.respond = false
  })

  router.get('/assinar/:tema', async ctx => {
    await app.render(ctx.req, ctx.res, '/assinar', ctx.params)
    ctx.respond = false
  })

  router.get('/done', async ctx => {
    await app.render(ctx.req, ctx.res, '/done', ctx.query)
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  return router.routes()
}

module.exports = routes