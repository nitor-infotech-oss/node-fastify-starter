import fastifyPlugin from 'fastify-plugin'
import proj4 from 'proj4'

function lookupZValue(xmin, ymax, scalex, scaley, xc, yc, zMat) {
  const xindex = Math.floor((xc - xmin) / scalex)
  const yindex = Math.floor((ymax - yc) / scaley)
  const xcal1 = xc - (xmin + xindex * scalex)
  const xcal2 = xmin + (xindex + 1) * scalex - xc

  let ci = -1
  if (xcal1 < xcal2) {
    ci = xindex
  } else {
    ci = xindex + 1
  }

  let ri = -1
  const ycal1 = yc - (ymax - (yindex + 1) * scaley)
  const ycal2 = ymax - yindex * scaley - yc
  if (ycal1 < ycal2) {
    ri = yindex + 1
  } else {
    ri = yindex
  }
  const z = zMat[ri][ci]
  return z
}

function Zmap(server, opts, next) {
  server.decorate(
    'getZValue',
    (getXyz) => async (coordinate_long, coordinate_lat) => {
      let { scalex, scaley, envelope, proj, zMatrix } = (
        (await getXyz()).rows || []
      ).pop().xyzJson

      var cords = proj4('EPSG:4326', proj, [coordinate_long, coordinate_lat])
      let zValue = -99999
      if (zMatrix) {
        zValue = lookupZValue(
          envelope.xmin,
          envelope.ymax,
          scalex,
          scaley,
          cords[0],
          cords[1],
          zMatrix
        )
      }
      if (zValue === null || typeof zValue === 'undefined') {
        return (-99999).toString()
      }
      return zValue.toString()
    }
  )
  next()
}
export default fastifyPlugin(Zmap)
