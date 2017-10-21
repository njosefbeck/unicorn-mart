let contentfulSpaceId = '';
let contentfulAccessToken = '';

if (process.env.NODE_ENV === 'production') {
  contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
  contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
} else {
  const tokens = require('./tokens');
  contentfulSpaceId = tokens.CONTENTFUL_SPACE_ID;
  contentfulAccessToken = tokens.CONTENTFUL_ACCESS_TOKEN;
}

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
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: contentfulSpaceId,
        accessToken: contentfulAccessToken,
      },
    },
    {
      resolve: `gatsby-plugin-stripe-checkout`,
      options: {}
    }
  ],
};
