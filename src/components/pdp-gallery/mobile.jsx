import React, { Component } from "react";
import Swiper from "react-id-swiper/lib/custom";

class PdpMobile extends Component {
  static defaultProps = {
    photos: []
  }
  render() {
    const { photos } = this.props;
    const params = {
      breakpoints: {
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
