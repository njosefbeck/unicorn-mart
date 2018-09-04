import React from 'react';
import { graphql } from 'gatsby';
import uuid from 'uuid/v4';
import moment from 'moment';
import './index.css';
import Layout from '../components/layout';
import OptionsFormContainer from '../components/options-form-container';
import Cart from '../components/cart';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: props.data.allContentfulProduct.edges[0].node,
      cart: {
        id: "",
        date: "",
        items: []
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeAllFromCart = this.removeAllFromCart.bind(this);
  }

  handleFormSubmit(product) {
    const items = [...this.state.cart.items, product];
    
    this.setState({
      cart: {
        id: uuid(),
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        items
      }
    });
  }

  removeFromCart(productId) {
    let items = [];

    if (this.state.cart.items.length > 1) {
      items = this.state.cart.items.filter(item => item.id !== productId);
    }
    
    this.setState({
      cart: {
        id: uuid(),
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        items
      }
    })
  }

  removeAllFromCart() {
    this.setState({
      cart: {
        id: '',
        date: '',
        items: []
      }
    })
  }

  render() {
    return (
      <Layout>
        <p className="intro">Welcome! Here you can pretend buy your very own special unicorn. Pick out the color you want, the size, and we'll pretend to ship it directly to your house. We'll never run out of stock, so buy as many unicorns as you want!</p>

        <p className="intro">The real purpose of this website is as a proof of concept e-commerce store powered by Contentful, GatsbyJS, Netlify, serverless, and clay.run. Check out the <a href="https://github.com/njosefbeck/unicorn-mart" target="_blank" rel="noopener noreferrer">repo</a> for more information.</p>

        <p className="intro">You won't be charged and the app won't remember any of your information. Feel free to use credit card number 4242 4242 4242 4242 and any date in the future and any three-digit code to test!</p>

        <section>
          <h2>Your Unicorn Options</h2>
          <OptionsFormContainer
            product={this.state.product}
            onFormSubmit={this.handleFormSubmit}
          />
        </section>

        <section className="cart">
          <h2>Your Cart</h2>
          <Cart 
            cart={this.state.cart}
            product={this.state.product}
            removeFromCart={this.removeFromCart}
            removeAllFromCart={this.removeAllFromCart}
          />
        </section>
      </Layout>
    )
  }
};

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          productId
          name
          price
          images {
            description
            file {
              url
            }
          }
          colors
          sizes
        }
      }
    }
  }
`;

export default IndexPage;
