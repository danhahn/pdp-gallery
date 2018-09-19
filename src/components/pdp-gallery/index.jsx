import React, { Component } from "react";
import styled, { css } from "styled-components";
import PdpMobile from "./mobile";
import PdpDesktop from "./desktop";

const PdpGalleryWrapper = styled.div`
  @media screen and (min-width: 510px) {
    margin-top: 500px;
    margin-bottom: 5000px;
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
`;

const Thumbnail = styled(Img)`
  opacity: 0.7;
  ${props =>
    props.active &&
    css`
      opacity: 1;
    `};
`;

const Icon = styled.img`
  max-width: 100%;
  display: block;
  &:not(.selected) {
    opacity: 0.7;
  }
  &.selected {
    outline: #000 dotted 1px;
  }
`;

const Photo = styled.img`
  display: block;
  margin-bottom: 10px;
`;

export default class PdpGallery extends Component {
  state = {
    screenWidth: null
  };

  handleResize = () => {
    this.setState({ screenWidth: window.outerWidth });
  };

  isMobile = () => this.state.screenWidth <= 768;

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div>
        {/* {this.state.screenWidth ? ( */}
          <PdpGalleryWrapper>
            {!this.isMobile() ? (
              <PdpDesktop
                photos={this.props.photos}
                render={() =>
                  this.props.photos.map((photo, index) => {
                    if (photo.video) {
                      return <div key={photo.id} dangerouslySetInnerHTML={{__html: photo.video}} style={{position: 'relative'}} />;
                    } else {
                      return (<Photo
                        src={photo.url}
                        onClick={() => console.log(photo.url)}
                        alt=""
                        key={`${photo.id}-photo`}
                      />)
                    }
                  })
                }
                renderThumbnails={(selected, updateSelectedIcon) =>
                  this.props.photos.map((photo, index) => {
                    <Icon
                      src={photo.url}
                      className={selected === index ? "selected" : null}
                      onClick={() => updateSelectedIcon(index)}
                      alt=""
                      key={photo.id}
                    />
                  })
                }
              />
            ) : (
              <PdpMobile
                photos={this.props.photos}
                render={() =>
                  this.props.photos.map(photo => {
                    if (photo.video) {
                      return <div key={photo.id} dangerouslySetInnerHTML={{ __html: photo.video }} style={{ position: 'relative' }} />;
                    } else {
                      return (<div key={photo.id}>
                        <Img src={photo.url} alt="" />
                      </div>)
                    }
                  })
                }
                renderThumbnails={(updateCurrentSlide, activeIndex) =>
                  this.props.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      onClick={() => updateCurrentSlide(index)}
                    >
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
        {/* ) : null} */}
      </div>
    );
  }
}
