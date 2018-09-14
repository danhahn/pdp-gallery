import React, { Component } from "react";
import PdpGallery from "./components/pdp-gallery";

class App extends Component {
  state = {
    photos: [],
    options: Array.of(...".".repeat(10))
  };
  componentDidMount = () => {
    const photos = this.props.photos.slice(0, 4);
    this.setState({ photos });
  };
  handleChange = event => {
    const photos = this.props.photos.slice(0, event.target.value);
    this.setState({ photos });
  };
  render() {
    const { photos } = this.state;
    return (
      <div>
        {/* <h1>One Big Test</h1> */}
        <select onChange={this.handleChange} value={photos.length} style={{position: 'fixed', left: 750, top: 200}}>
          {
            this.state.options.map((item, index) => (
              <option
                defaultValue={index}
                key={`${item}-${index}`}
              >
                {index}
              </option>
            ))
          }
        </select>
        <PdpGallery photos={photos} />
      </div>
    );
  }
}

export default App;
