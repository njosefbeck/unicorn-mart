import React from 'react';
import uuid from 'uuid/v4';

import { pluralize } from '../helpers.js';

class OptionsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      color: this.props.product.colors[0],
      size: this.props.product.sizes[0],
      price: 0,
      error: ''
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountChange(event) {
    const amount = parseInt(event.target.value, 10);
    let error = '';
    
    if (isNaN(amount)) {
      error = 'Amount can\'t be blank!';
    }

    this.setState({
      amount,
      price: amount * this.props.product.price,
      error
    });
  }

  handleSelectChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    if (name === 'color') {
      this.props.onColorChange(event.target.value);
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (isNaN(this.state.amount)) {
      return this.setState({
        error: 'Amount still can\'t be blank!'
      });
    }

    const product = {
      id: uuid(),
      contentfulId: this.props.product.id,
      productId: this.props.product.productId,
      amount: this.state.amount,
      price: this.state.price,
      color: this.state.color,
      size: this.state.size
    };

    this.props.onFormSubmit(product);

    // Reset form values
    this.setState({
      amount: 0,
      color: this.props.product.colors[0],
      size: this.props.product.sizes[0],
      price: 0,
      error: ''
    });
  }

  render() {
    const colors = this.props.product.colors.map(color => {
      return <option key={color} value={color}>{color}</option>;
    });

    const sizes = this.props.product.sizes.map(size => {
      return <option key={size} value={size}>{size}</option>;
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-element">
          <p className="error">{this.state.error}</p>
          <label>
            <span className="label">Amount:</span>
            <input 
              type="number"
              name="amount"
              min="0"
              value={this.state.amount}
              onChange={this.handleAmountChange}
            />
          </label>
        </div>
        <div className="form-element">
          <label>
            <span className="label">Color:</span>
            <select
              value={this.state.color}
              name="color"
              onChange={this.handleSelectChange}
            >
              {colors}
            </select>
          </label>
        </div>
        <div className="form-element">
          <label>
            <span className="label">Size:</span>
            <select
              value={this.state.size}
              name="size"
              onChange={this.handleSelectChange}
            >
              {sizes}
            </select>
          </label>
        </div>
        <button type="submit" name="submit">
          {`Add ${isNaN(this.state.amount) ? '__' : this.state.amount} ${this.state.size}, ${this.state.color} unicorn${pluralize(this.state.amount)} for $${isNaN(this.state.price) ? '__' : this.state.price} to your cart?`}
        </button>

      </form>
    );
  }
}

export default OptionsForm;
