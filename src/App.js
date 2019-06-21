import React, { Component } from "react";
import PdpGallery from "./components/pdp-gallery";

class App extends Component {
  render() {
    return (
      <div>
        <PdpGallery photos={this.props.photos} />
      </div>
    );
  }
}

export default App;
