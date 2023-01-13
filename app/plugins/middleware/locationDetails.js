import fastifyPlugin from 'fastify-plugin'
import nodeGeocoder from 'node-geocoder'

function locationDetails(server, opts, next) {
  server.decorate('locationDetails', async (req, reply, next) => {
    // Get fetched flag from body, if it's true then skip the process and continue. If it's false
    // Get the other details using lat and long
    const { fetched } = req.body

    if (!fetched) {
      // Initially set the values as empty string
      req.body.country = null
      req.body.state = null
      req.body.city = null

      // Set the provider for geocoder
      const options = {
        provider: 'openstreetmap'
      }
      // Initialise geocoder
      const geoCoder = nodeGeocoder(options)

      try {
        server.log.info('Before getting location')
        server.log.info('req.body.latitude: ' + req.body.latitude)
        server.log.info('req.body.longitude: ' + req.body.longitude)
        // Do the reverse geocoding
        const locationDetails = await geoCoder.reverse({
          lat: req.body.latitude,
          lon: req.body.longitude
        })
        server.log.info('locationDetails: ' + locationDetails)
        if (locationDetails && locationDetails.length > 0) {
          // Add first entry of response in country and state
          req.body.country = locationDetails[0].country
          req.body.state = locationDetails[0].state
          req.body.city = locationDetails[0].city
          req.body.county = locationDetails.raw.address.county
        }
      } catch (err) {
        server.log.error('Error in getting location details: ' + err)
      }
    }
    next()
  })
  next()
}

export default fastifyPlugin(locationDetails)
