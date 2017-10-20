module.exports = {
  siteMetadata: {
    title: `Unicorn Mart`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-44175001-4',
        anonymize: true
      },
    },
  ],
}
