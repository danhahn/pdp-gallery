import React, { Component } from "react";
import Swiper from "react-id-swiper/lib/custom";
import styled from 'styled-components';

const PdpGalleryWrapper = styled.div`
  border: 1px solid black;
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
  transition: all 300ms;
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
      activeIndex: 0,
      thumbnailPositions: [],
      thumbnailWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({ swiper: this.swiper });
    this.swiper.el.addEventListener("touchend", this.updateCurrentIndex);
    let last = 0;
    let firstTouch = null;
    // this.thumbnailWrapper.addEventListener("touchmove", (event) => {
    //   const currentPost = Math.round(event.touches[0].clientX);
    //   if (!firstTouch) {
    //     firstTouch = currentPost;
    //   }
    //   console.log(currentPost - firstTouch);
    //   this.thumbnails.style.transform = `translateX(${currentPost - firstTouch}px)`;
    //   last = currentPost;
    // }, false)
    // // console.log(this.thumbnails)

    // this.thumbnails.addEventListener("touchend", (event) => {
    //   firstTouch = null;
    //   console.log(this.thumbnails.getBoundingClientRect());
    //   // this.thumbnails.style.transform = `translateX(0)`;
    // });

    // const thumbnailWidth = this.thumbnails.querySelector('img').getBoundingClientRect().width;
    // const thumbnailPositions = [...this.thumbnails.querySelectorAll("img")].map(
    //   thumb => {
    //     const { right } = thumb.getBoundingClientRect();
    //     return right;
    //   }
    // );
    // this.setState({ thumbnailPositions, thumbnailWidth });
  }

  updateCurrentIndex() {
    const { activeIndex } = this.swiper;
    this.setState({ activeIndex });
    if(activeIndex <= 4) {
      this.thumbsSwiper.slidePrev(100);
    }
    if(activeIndex >= 5) {
      this.thumbsSwiper.slideNext(100);
    }
  }

  updateCurrentSlide(nextSlide) {
    this.swiper.slideTo(nextSlide, 200);
    this.setState({ activeIndex: nextSlide });
  }

  updateThumbnailPos() {
    const {activeIndex} = this.state;
    if (activeIndex <= 4) {
      this.thumbsSwiper.slidePrev(100);
    }
    if (activeIndex >= 5) {
      this.thumbsSwiper.slideNext(100);
    }
  }

  render() {
    const { render, renderThumbnails } = this.props;
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
    const thumbsParams = {
      breakpoints: {
        510: {
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 10
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
        <div style={{marginTop: 10}}>
          <Swiper {...thumbsParams} ref={node => {
              if (node) {
                this.thumbsSwiper = node.swiper;
              }
            }}>
            {renderThumbnails(this.updateCurrentSlide, activeIndex)}
          </Swiper>
        </div>
      </PdpGalleryWrapper>;
  }
}

export default PdpMobile;
