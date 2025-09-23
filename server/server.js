const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add custom routes before JSON Server router
server.get('/users/count', (req, res) => {
  const count = router.db.get('users').value().length
  res.json({ count })
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})