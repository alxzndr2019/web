import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ApolloProvider } from 'react-apollo';
import ReactGA from 'react-ga';
import { graphql } from 'gatsby'

import config from '../config';
import apolloClient from '../utils/apolloClient';
import Header from './Header';
import Footer from './Footer';

class IndexLayout extends React.Component {
  componentWillMount() {
    ReactGA.initialize(config.googleAnalytics, {
      // debug: config.DEBUG,
    });
  }

  render() {
    const {
      children,
      // data: { contentfulHome: home },
    } = this.props;
    // TODO: fix this
    const home = {};

    return (
      <ApolloProvider client={apolloClient}>
        <div>
          <Helmet
            title={config.siteName}
            meta={[{ name: 'description', content: config.description }]}
          />
          <div className="container">
            <Header home={home} />
            {children}
          </div>
          <Footer home={home} />
        </div>
      </ApolloProvider>
    );
  }
}

IndexLayout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default IndexLayout;

export const indexLayoutQuery = graphql`
  query IndexLayout {
    contentfulHome {
      telephone
      email
      address
      facebook
      twitter
      instagram
      pinterest
    }
  }
`;
