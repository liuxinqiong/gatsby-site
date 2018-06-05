module.exports = {
  pathPrefix: `/gatsby-site`,
  siteMetadata: {
    title: 'BLOG',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve:'gatsby-plugin-typography',
      options:{
        pathToConfigModule:'src/utils/typography.js'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts/`,
        name: "posts",
      },
    },
    `gatsby-transformer-remark`,
  ],
}