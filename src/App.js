import React, { Component } from "react";
import PdpGallery from "./components/pdp-gallery";

class App extends Component {
  state = {
    photos: []
  };
  render() {
    const { photos } = this.state;
    return (
      <div>
        <PdpGallery photos={photos} />
      </div>
    );
  }
}

export default App;
