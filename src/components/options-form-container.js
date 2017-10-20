import React from 'react'

import OptionsForm from './options-form'

class OptionsFormContainer extends React.Component {
  constructor(props) {
    super(props);

    const images = props.product.images;
    const defaultImage = images.find(image => image.file.url.includes('black'));

    this.state = {
      url: defaultImage.file.url,
      alt: defaultImage.description
    };

    this.updateImage = this.updateImage.bind(this);
  }

  updateImage(color) {
    const newImage = this.props.product.images.find(image => image.file.url.includes(color));

    this.setState({
      url: newImage.file.url,
      alt: newImage.description
    });
  }

  render() {
    return (
      <div className="options-container">
        <div className="form-container">
          <OptionsForm
            product={this.props.product}
            onFormSubmit={this.props.onFormSubmit}
            onColorChange={this.updateImage}
          />
        </div>
        <div className="image-container"><img src={this.state.url} alt={this.state.alt} /></div>
      </div>
    )
  }
}

export default OptionsFormContainer