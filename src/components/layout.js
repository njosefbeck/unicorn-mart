import React from 'react';
import Helmet from 'react-helmet';
import './layout.css';

const Header = () => (
  <header>
    <h1 className="site-title">Unicorn Mart</h1>
  </header>
);

const Layout = ({ children }) => (
  <div className="app">
    <Helmet
      title="Unicorn Mart | A Contentful/GatsbyJS/Stripe ecommerce proof of concept"
      meta={[
        { name: 'description', content: 'A proof of concept for an e-commerce store powered by Contentful, Gatsby.js, Stripe, serverless, and clay.run.' },
      ]}
    />
    <Header />
    <main>
      {children}
    </main>
    <footer>
      Built with love by <a href="https://njosefbeck.com">njosefbeck</a>
    </footer>
  </div>
);

export default Layout;
