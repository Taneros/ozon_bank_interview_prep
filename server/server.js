const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Reduce delay to a more reasonable amount (150ms instead of 1800ms)
server.use((req, res, next) => {
  setTimeout(next, 150)
})

// Disable browser caching
server.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

server.use(middlewares)

server.get('/users/count', (req, res) => {
  const count = router.db.get('users').value().length
  res.json({ count })
})

server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001 with 150ms delay (no cache)')
})