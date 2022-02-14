import webpack from 'webpack'

const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'my-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: true,
  plugins: [
    '~/plugins/components.js',
    '~/plugins/events.js',
    '~/plugins/font-awesome.js',
    '~/plugins/http.js',
    '~/plugins/vuetify.js', 
    '~/plugins/vue-smooth-picker.js',
    '~/plugins/vue-croppa.js',
    {src: '~/plugins/vue-sample-uploader.js', ssr: false},
    '~/plugins/vue-js-modal',
    {src: '~/plugins/localStorage.js', ssr: false },
    '~/plugins/filters.js'
  ],
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/helvetica/helvetica.css',
    '~/assets/style/helvetica-neue/helvetica-neue.css'
  ],
  env: {
    API_URL: 'http://localhost:8000/api' // waiting for the api xd
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/apollo',
    'nuxt-material-design-icons',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:8000/api/admin/graphiql',
      }
    }
  },
    /*
  ** If you  want to use static hosting use 'target: static' in order for the generate command to work properly.
  */

  // target: 'static',

  target: 'server', /* server hosting, when using build command */
  
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin(),
      new webpack.ProvidePlugin({
          '_': 'lodash',  /* see sample implementation @ GlobalToolbar.vue */
          'moment': 'moment'
      })
    ],
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
