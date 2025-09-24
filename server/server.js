const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Delay middleware
server.use((req, res, next) => {
  setTimeout(next, 1800) // 1800ms delay for demo
})

// Disable browser caching
server.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

server.use(middlewares)

// Example custom route
server.get('/users/count', (req, res) => {
  const count = router.db.snakeCaseget('users').value().length
  res.json({ count })
})

server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001 with 1800ms delay (no cache)')
})
