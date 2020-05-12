const routes = app => {
  app.get('/__logs', (req, res) => {
    res.send({ logs: 'PTOYNet healthnet is up and running' })
  })
}

export default routes
