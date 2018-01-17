const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const env = process.env.NODE_ENV
const SpikeDatoCMS = require('spike-datocms')
const locals = {}

require('dotenv').config()

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.html', css: '*(**/)*.sss' },
  ignore: ['**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  plugins: [
    new SpikeDatoCMS({
      addDataTo: locals,
      token: `${process.env.API_KEY}`,
      models: [{
        name: 'project',
        template: {
          path: 'views/project.html',
          output: (project) => {
            return `./${project.slug}.html`
          }
        }
      }]
    })
  ],
  reshape: htmlStandards({
    locals: (ctx) => {
      return Object.assign(
        locals,
        {pageId: pageId(ctx)}
      )
    },
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}
