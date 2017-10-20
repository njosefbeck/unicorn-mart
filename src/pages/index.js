import React from 'react'
import Link from 'gatsby-link'

import './index.css';
import OptionsFormContainer from '../components/options-form-container'
import Cart from '../components/cart'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: props.data.allContentfulProduct.edges[0].node,
      cart: {
        date: Date.now(),
        items: []
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeAllFromCart = this.removeAllFromCart.bind(this);
  }

  handleFormSubmit(product) {
    event.preventDefault();

    const items = [...this.state.cart.items, product];
    
    this.setState({
      cart: {
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
        items
      }
    })
  }

  removeAllFromCart() {
    this.setState({
      cart: {
        items: []
      }
    })
  }

  render() {
    return (
      <div>
        <p className="intro">Welcome! Here you can pretend buy your very own special unicorn. Pick out the color you want, the size, and we'll pretend to ship it directly to your house. We'll never run out of stock, so buy as many unicorns as you want!</p>

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
            removeFromCart={this.removeFromCart}
            removeAllFromCart={this.removeAllFromCart}
          />
        </section>
      </div>
    )
  }
}

export const query = graphql`
  query ProductsQuery {
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
`

export default IndexPage
