import React, { Component } from "react";
import styled, { css } from "styled-components";
import PdpMobile from "./mobile";
import PdpDesktop from "./desktop";

const PdpGalleryWrapper = styled.div`
  margin-top: 500px;
  margin-bottom: 5000px;
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
`;

const Thumbnail = styled(Img)`
  opacity: 0.7;
  ${props =>
    props.active &&
    css`
      opacity: 1;
    `};
`;

export default class PdpGallery extends Component {
  state = {
    screenWidth: null
  };

  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  isMobile = () => this.state.screenWidth <= 510;

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <PdpGalleryWrapper>
        {!this.isMobile() ? (
          <PdpDesktop photos={this.props.photos} />
        ) : (
          <PdpMobile
            photos={this.props.photos}
            render={() =>
              this.props.photos.map(photo => (
                <div key={photo.id}>
                  <Img src={photo.url} alt="" />
                </div>
              ))
            }
            renderThumbnails={(updateCurrentSlide, activeIndex) =>
              this.props.photos.map((photo, index) => (
                <div key={photo.id} onClick={() => updateCurrentSlide(index)}>
                  <Thumbnail
                    src={photo.url}
                    active={index === activeIndex}
                    alt=""
                  />
                </div>
              ))
            }
          />
        )}
      </PdpGalleryWrapper>
    );
  }
}
