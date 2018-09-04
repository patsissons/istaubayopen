module.exports = {
  siteMetadata: {
    description: 'Check if Pho Tau Bay is Open',
    siteName: 'istaubayopen',
    siteUrl: 'http://istaubayopen.com',
    title: 'istaubayopen',
    author: {
      name: 'Pat Sissons',
      url: 'http://github.com/patsissons/istaubayopen',
      email: 'patricksissons@gmail.com',
    },
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-extract-schema',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: 'src/data/',
      },
    },
  ],
};
