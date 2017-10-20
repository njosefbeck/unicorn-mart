import React from 'react'
import Link from 'gatsby-link'

import './index.css';
import blackUnicorn from '../components/black.png';
import OptionsFormContainer from '../components/options-form-container'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ["black", "white", "rainbow", "mauve", "mustard", "teal", "pink"],
        sizes: ["tiny", "small", "medium", "large", "huge"],
        price: 10
      },
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
            options={this.state.options}
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

function calculateProductTotals(items) {
  const totalAmount = items
    .map(item => item.amount)
    .reduce((total, currentAmount) => total + currentAmount);
  
  const totalPrice = items
    .map(item => item.price)
    .reduce((total, currentPrice) => total + currentPrice);

  return {
    amount: totalAmount,
    price: totalPrice
  }
}

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.renderStatus = this.renderStatus.bind(this);
    this.renderCartItems = this.renderCartItems.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  renderStatus() {
    const cartItems = this.props.cart.items;
    let status = "Nothing in your cart yet :(.";

    if (cartItems.length) {
      const totals = calculateProductTotals(cartItems);
      status = `It looks like you're buying <strong>${totals.amount} unicorns</strong> for a grand total of <strong>$${totals.price}</strong>. Sweet!`;
    }

    return { __html: status };
  }

  removeFromCart(id) {
    this.props.removeFromCart(id);
  }

  renderCartItems() {
    return this.props.cart.items.map(item => {
      return (
        <li className="cart-item" key={item.id}>
          <div className="cancel" onClick={(e) => this.removeFromCart(item.id)}>remove</div>
          <img src={blackUnicorn} alt="Black Unicorn" />
          <p className="description">{item.amount} {item.size}, {item.color} unicorns</p>
          <p className="price">${item.price}</p>
        </li>
      );
    });
  }

  render() {
    if (!this.props.cart.items.length) {

      return (
        <p className="status" dangerouslySetInnerHTML={this.renderStatus()} />
      );

    } else {

      

      return (
        <div>
          <p className="status" dangerouslySetInnerHTML={this.renderStatus()} />

          <button className="buy" name="buy">Buy Now!</button>

          <button className="clear-cart" name="clear-cart" onClick={this.props.removeAllFromCart}>Clear All</button>

          <ul className="cart-items">
            {this.renderCartItems()}
          </ul>
        </div>
      );
    }
  }
}

export default IndexPage
