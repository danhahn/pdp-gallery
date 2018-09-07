import React, { Component } from "react";
import Swiper from "react-id-swiper/lib/custom";
import {
  CustomButtonPrev,
  CustomButtonNext
} from "./components";

class PdpMobile extends Component {
  static defaultProps = {
    photos: []
  }
  render() {
    const { photos } = this.props;
    const params = {
      // pagination: {
      //   el: ".swiper-pagination",
      //   type: "bullets",
      //   clickable: true
      // },
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev"
      // },
      // renderPrevButton: () => (
      //   <CustomButtonPrev className="swiper-button-prev" />
      // ),
      // renderNextButton: () => (
      //   <CustomButtonNext className="swiper-button-next" />
      // ),
      // spaceBetween: 30,
      breakpoints: {
        // when window width is <= 510px
        510: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 15
        }
      }
    };
    return (
      <Swiper {...params} id="plp">
        {photos.map(photo => (
          <div key={photo.id}>
            <img src={photo.url} alt="" style={{maxWidth: '100%'}} />
          </div>
        ))}
      </Swiper>
    );
  }
}

export default PdpMobile;
