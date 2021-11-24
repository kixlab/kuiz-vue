export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Configure router settings
  router: {},

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Kuiz",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/styles/main.scss"],

  // Customize the progress bar color
  loading: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue2-animate" },
    { src: "~/plugins/v-tooltip" },
    { src: "~/plugins/vue-google-oauth2" },
    { src: "~/plugins/vuex-persist" },
    { src: "~/plugins/dayjs-breakpoints" },
    { src: "~/plugins/vue-draggable" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/dayjs"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  dayjs: {
    locales: ["en"],
    defaultLocale: "en",
    defaultTimeZone: "Asia/Tokyo",
    plugins: [
      "utc", // import 'dayjs/plugin/utc'
      "timezone", // import 'dayjs/plugin/timezone'
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseURL: (() => {
      switch (process.env.BUILD_ENV) {
        case "local":
          return "http://localhost:4000";
        case "staging":
          return "http://13.124.178.61:4000";
        case "production":
          return "http://13.124.178.61:5000";
      }
    })(),
  },
};
