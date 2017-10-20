import React from 'react'

import OptionsForm from './options-form'

import blackUnicorn from './black.png';

class OptionsFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'black'
    };

    this.renderImage = this.renderImage.bind(this);
  }

  renderImage() {
    // Get all the possible images from the gallery
    // Choose the appropriate image based on this.state.color
    // Return that image path

    return blackUnicorn;
  }

  render() {
    return (
      <div className="options-container">
        <div className="form-container">
          <OptionsForm 
            options={this.props.options}
            onFormSubmit={this.props.onFormSubmit}
          />
        </div>
        <div className="image-container"><img src={this.renderImage()} alt="Unicorn" /></div>
      </div>
    )
  }
}

export default OptionsFormContainer