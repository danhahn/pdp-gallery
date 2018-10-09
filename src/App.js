import React, { Component } from "react";
import PdpGallery from "./components/pdp-gallery";
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  @media screen and (min-width: 769px){
    left: 750px;
    top: 200px;
  }
  @media screen and (max-width: 768px){
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1em;
    background-color: lightblue;
    z-index: 100;

    select {
      border: 1px solid black;
      margin-left: 10px;
      padding: 1em;
    }
  }
`;

class App extends Component {
  state = {
    photos: [],
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
        <PdpGallery photos={photos} />
      </div>
    );
  }
}

export default App;
