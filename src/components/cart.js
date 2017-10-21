import React from 'react'

if (typeof window !== 'undefined') {
  const stripeHandler = StripeCheckout.configure({
    key: 'pk_test_U78fJAAuXr0aN5ETF5qSNR1n',
    locale: 'auto',
  });
}

function convertWholeDollarsToCents(dollars) {
  return dollars * 100;
}

function convertCentsToWholeDollars(cents) {
  return cents / 100;
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
    this.openStripeCheckout = this.openStripeCheckout.bind(this);
  }

  openStripeCheckout(event) {

    const image = this.props.product.images.find(image => image.file.url.includes('black'));
    const imageUrl = image.file.url;

    const cartItems = this.props.cart.items;
    const totals = calculateProductTotals(cartItems);

    event.preventDefault();
    stripeHandler.open({
      name: 'Unicorn Mart',
      image: imageUrl,
      description: `${totals.amount} unicorn(s)`,
      zipCode: true,
      billingAddress: true,
      shippingAddress: true,
      amount: convertWholeDollarsToCents(totals.price),
      token: (token, args) => {
        fetch('https://4woaotaoqh.execute-api.us-east-1.amazonaws.com/dev/charges', {
          method: 'POST',
          body: JSON.stringify({
            token,
            args,
            cart: this.props.cart,
            charge: {
              amount: totals.price,
              currency: 'USD'
            },
          })
        })
        .then(response => {
          console.log(response.json());
        })
        .catch(error => {
          console.log('Fetch failed:' + error);
        });
      }
    });
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

      // Render proper image
      const image = this.props.product.images.find(image => image.file.url.includes(item.color));

      return (
        <li className="cart-item" key={item.id}>
          <div className="cancel" onClick={(e) => this.removeFromCart(item.id)}>remove</div>
          <img src={image.file.url} alt={image.description} />
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

          <button className="buy" name="buy" onClick={(e) => this.openStripeCheckout(e)}>Buy Now!</button>

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