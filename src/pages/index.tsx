import { graphql } from 'gatsby';
import * as React from 'react';
import Layout from '~/layouts';

export interface Props {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
    allDataJson: {};
  };
}

export default function({ data }: Props) {
  return (
    <Layout>
      <p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </p>
    </Layout>
  );
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
    allDataJson {
      edges {
        node {
          testing
        }
      }
    }
  }
`;
