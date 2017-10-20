import React from 'react'

import blackUnicorn from '../components/black.png';

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

export default Cart