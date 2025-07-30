// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://topupgameku.shop",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml", "/admin", "/admin/*"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://topupgameku.shop/server-sitemap.xml", // <==== Add here
    ],
  },
};
