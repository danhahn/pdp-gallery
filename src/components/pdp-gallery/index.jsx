import React, { Component } from 'react'
import styled from 'styled-components';
import PdpMobile from './mobile';
import PdpDesktop from './desktop';

const PdpGalleryWrapper = styled.div`
  margin-top: 500px;
  margin-bottom: 5000px;
`;

export default class PdpGallery extends Component {
  state = {
    screenWidth: null
  }

  handleResize = () => {
    this.setState({screenWidth: window.innerWidth})
  }

  isMobile = () => this.state.screenWidth<= 510;

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return <PdpGalleryWrapper>
        {!this.isMobile() ? (
          <PdpDesktop photos={this.props.photos} />
        ) : (
          <PdpMobile photos={this.props.photos} />
        )}
      </PdpGalleryWrapper>;
  }
}
