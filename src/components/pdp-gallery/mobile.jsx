import React, { Component } from "react";
import Swiper from "react-id-swiper/lib/custom";
import styled, { css } from 'styled-components';

const PdpGalleryWrapper = styled.div`
  border: 1px solid black;
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

const ThumbnailsWrapper = styled.div`
  overflow: hidden;
`;

const Thumbnails = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-gap: 10px;
  margin-top: 10px;
  grid-template-columns: 44px;
  grid-auto-flow: column;
  grid-auto-columns: 44px;
`;

class PdpMobile extends Component {
  static defaultProps = {
    photos: []
  };

  constructor(props) {
    super(props);
    this.swiper = null;
    this.updateCurrentIndex = this.updateCurrentIndex.bind(this);
    this.updateCurrentSlide = this.updateCurrentSlide.bind(this);
    this.state = {
      swiper: "1234",
      activeIndex: 0
    };
  }

  componentDidMount() {
    this.setState({ swiper: this.swiper });
    this.swiper.el.addEventListener("touchend", this.updateCurrentIndex);
  }

  updateCurrentIndex() {
    const {activeIndex} = this.swiper;
    this.setState({ activeIndex });
  }

  updateCurrentSlide(nextSlide) {
    this.swiper.slideTo(nextSlide, 200);
    this.setState({ activeIndex: nextSlide });
  }

  render() {
    const { photos, render, renderThumbnails } = this.props;
    const { activeIndex } = this.state;
    const params = {
      breakpoints: {
        510: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 15
        }
      }
    };
    return <PdpGalleryWrapper>
        <Swiper {...params} ref={node => {
            if (node) {
              this.swiper = node.swiper;
            }
          }}>
          {render(this.state.activeIndex)}
        </Swiper>
        <ThumbnailsWrapper>
          <Thumbnails>
            {renderThumbnails(this.updateCurrentSlide, activeIndex)}
          </Thumbnails>
        </ThumbnailsWrapper>
      </PdpGalleryWrapper>;
  }
}

export default PdpMobile;
