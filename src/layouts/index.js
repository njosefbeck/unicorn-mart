import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.css';

const Header = () => (
  <header>
    <h1 className="site-title">Unicorn Mart</h1>
  </header>
)

const TemplateWrapper = ({ children }) => (
  <div className="app">
    <Helmet
      title="Unicorn Mart | A Contentful/GatsbyJS/Stripe ecommerce proof of concept"
      meta={[
        { name: 'description', content: 'A proof of concept for an e-commerce store powered by Contentful, Gatsby.js, Stripe, serverless, and AWS Lambda.' },
      ]}
    />
    <Header />
    <main>
      {children()}
    </main>
    <footer>
      Built with love by <a href="https://njosefbeck.com">njosefbeck</a>
    </footer>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper;
