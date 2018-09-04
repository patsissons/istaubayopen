const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const fs = require('fs');
const path = require('path');
const { printSchema } = require('gatsby/graphql');

const snapshotLocation = path.resolve(process.cwd(), 'schema.graphql');

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
    },
  });
};

exports.onPostBootstrap = ({ store }) => {
  try {
    const { schema } = store.getState();
    const sdl = printSchema(schema);
    fs.writeFileSync(snapshotLocation, sdl);
    console.log('Wrote schema');
  } catch (e) {
    console.log('Failed to write schema: ', e);
  }
};
