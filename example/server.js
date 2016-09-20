import webpack from 'webpack'
import WebpackServer from 'webpack-dev-server'
import config from './webpack.config'

const host = 'localhost'
const port = 3000
const server = new WebpackServer(webpack(config), {
  hot: true,
  inline: false,
  publicPath: config.output.publicPath,
  contentBase: './example',
  historyApiFallback: true,
  stats: {
    colors: true
  }
})

server.listen(port, host, (err) => {
  if (err) {
    console.log(err.message)
  }
  console.log(`Listening on http://${host}:${port}`)
})
