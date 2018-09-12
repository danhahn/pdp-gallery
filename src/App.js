import React, { Component } from "react";
import PdpGallery from "./components/pdp-gallery";

class App extends Component {
  render() {
    const { photos } = this.props;
    return <PdpGallery photos={photos} />;
  }
}

export default App;
