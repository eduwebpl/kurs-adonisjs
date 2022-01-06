const mix = require('laravel-mix')

/**
 * By default, AdonisJS public path for static assets is on the `./public` directory.
 *
 * If you want to change Laravel Mix public path, change the AdonisJS public path config first!
 * See: https://docs.adonisjs.com/guides/static-assets#the-default-directory
 */
mix.setPublicPath('public')

// Add your assets here
mix.js("resources/js/app.js", "public/js")
  .postCss("resources/css/app.css", "public/css", [
  require("tailwindcss"),
]);
