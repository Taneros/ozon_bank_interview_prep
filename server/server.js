const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use((req, res, next) => {
  setTimeout(next, 1500)
})

// Disable browser caching
server.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

server.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    try {
      const data = JSON.parse(body);
      if (Array.isArray(data)) {
        console.log(`server/server.js - line: 23 ->> data.length`, data.length)
        res.set('X-Total-Count', data.length);
      }
    } catch {
      // If it's not JSON or not an array, continue normally
    }
    originalSend.call(this, body);
  };
  next();
});

server.use(middlewares)

server.get('/users/count', (req, res) => {
  const count = router.db.get('users').value().length
  res.json({ count })
})

server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001 with 150ms delay (no cache)')
})