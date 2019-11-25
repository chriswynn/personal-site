const htmlStandards = require("reshape-standard");
const cssStandards = require("spike-css-standards");
const jsStandards = require("spike-js-standards");
const pageId = require("spike-page-id");
const sugarss = require("sugarss");
const env = process.env.NODE_ENV;
const locals = {};

require("dotenv").config();

module.exports = {
  devtool: "source-map",
  matchers: { html: "*(**/)*.html", css: "*(**/)*.sss" },
  ignore: ["**/layout.html", "**/_*", "**/.*", "readme.md", "yarn.lock"],
  plugins: [],
  reshape: htmlStandards({
    locals: ctx => {
      return Object.assign(locals, { pageId: pageId(ctx) });
    },
    minify: env === "production"
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === "production",
    warnForDuplicates: env !== "production"
  }),
  babel: jsStandards()
};
