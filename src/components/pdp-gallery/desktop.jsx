import React, { Component } from "react";
import styled, { css } from "styled-components";
import { CustomButtonPrev, CustomButtonNext } from "./components";

const State = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  position: fixed;
  top: 10px;
  left: 700px;
  border: 3px solid lightgrey;
  padding: 1em;
`;

const Desktop = styled.div`
  display: grid;
  grid-template-columns: 70px 550px;
  grid-gap: 50px;
  opacity: 0;
  height: 737px;
  overflow: hidden;
  &::before {
    position: fixed;
    content: "";
    display: block;
    top: 150px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: rebeccapurple;
  }
  &::after {
    position: fixed;
    content: "";
    display: block;
    top: 100px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: yellowgreen;
  }
  ${props =>
    props.active &&
    css`
      opacity: 1;
      height: auto;
      overflow: visible;
    `};
`;

const Nav = styled.nav`
  width: 70px;
  border: 1px solid blue;
  .inner {
    border: 1px solid red;
  }
  &.fixed {
    .inner {
      width: 70px;
      position: fixed;
      top: 100px;
    }
  }
  &.bottom {
    position: relative;
    .inner {
      position: absolute;
      bottom: 0;
      top: inherit;
    }
  }
`;

const UpButton = styled(CustomButtonPrev)`
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(0);
  width: 100%;
  display: block;
  margin-top: 50px;
`;

const DownButton = styled(CustomButtonNext)`
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(0);
  width: 100%;
  display: block;
  margin-top: 25px;
`;

export default class PdpDesktop extends Component {
  static state = {
    photos: []
  };
  state = {
    selected: 0,
    totalItems: 0,
    navBottom: null,
    imageListPositions: [],
    loadedImages: 0,
    done: false
  };
  componentDidMount() {
    this.checkIfImagesLoaded();
    window.addEventListener("scroll", this.checkOffSet);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.photos.length !== this.props.photos.length) {
      this.checkIfImagesLoaded();
    }
    if (
      this.state.loadedImages === this.photos.querySelectorAll("img").length &&
      !this.state.done
    ) {
      this.setState({ done: true });
      this.updateDisplayState();
    }
  }

  checkIfImagesLoaded = () => {
    const _this = this;
    const images = this.photos.querySelectorAll("img");
    const nodeListImages = [].slice.call(images);
    nodeListImages.forEach(img =>
      img.addEventListener("load", function cb(event) {
        _this.setState({
          loadedImages: _this.state.loadedImages + 1
        });
        event.currentTarget.removeEventListener(event.type, cb);
      })
    );
  };

  updateDisplayState = () => {
    this.setState(
      {
        totalItems: this.props.photos.length,
        imageListPositions: [...this.photos.querySelectorAll("img")].map(
          photo => photo.offsetTop
        )
      },
      () => {
        const videos = [...this.photos.querySelectorAll('video')];
        if (videos.length >= 1) {
          const height = this.state.imageListPositions
              .slice(-2)
              .reduce((acc, value) => value - acc, 0);
          const [lastHeight] = this.state.imageListPositions.slice(-1);
          const newOffSets = videos.map((video, i) => {
            return lastHeight + (height * (i + 1))
          });
          this.setState({ imageListPositions: [...this.state.imageListPositions, ...newOffSets]})
        }

        setTimeout(() => {
          this.setState({
            navBottom: Math.round(this.inner.getBoundingClientRect().height)
          });
        }, 200);
      }
    );
  };

  scrollToImage = selected => {
    const { imageListPositions: pos } = this.state;
    window.scrollTo({
      top: pos[selected] - 150,
      behavior: "smooth"
    });
  };

  updateSelectedIcon = selected => {
    this.scrollToImage(selected);
  };

  checkOffSet = () => {
    const {
      navBottom,
      imageListPositions,
      selected: stateSelected
    } = this.state;
    const { nav } = this;
    const { top, bottom } = nav.getBoundingClientRect();
    if (top <= 100) {
      nav.classList.add("fixed");
    } else {
      nav.classList.remove("fixed");
    }
    if (bottom - 100 <= navBottom) {
      nav.classList.add("bottom");
    } else {
      nav.classList.remove("bottom");
    }
    const selected = imageListPositions
      .map(number => number + top)
      .findIndex(number => number > 0);
    if (selected !== -1 && stateSelected !== selected) {
      this.setState({ selected });
    }
  };

  increaseSelectedItem = () => {
    const { totalItems, selected } = this.state;
    const next = selected + 1;
    if (next < totalItems) this.scrollToImage(next);
  };

  decreaseSelectedItem = () => {
    const { selected } = this.state;
    const next = selected - 1;
    if (next >= 0) this.scrollToImage(next);
  };

  render() {
    const { totalItems } = this.state;
    const { selected, done } = this.state;
    return (
      <div>
        {!done ? "...Loading" : null}
        <Desktop active={done}>
          <Nav innerRef={el => (this.nav = el)}>
            <div className="inner" ref={el => (this.inner = el)}>
              {this.props.renderThumbnails(selected, this.updateSelectedIcon)}
              {totalItems > 1 ? (
                <UpButton onClick={this.decreaseSelectedItem} />
              ) : null}
              {totalItems > 1 ? (
                <DownButton onClick={this.increaseSelectedItem} />
              ) : null}
            </div>
          </Nav>
          <section ref={el => (this.photos = el)}>
            {this.props.render()}
          </section>
        </Desktop>
        <State>
          <li>selected: {this.state.selected}</li>
          <li>totalItems: {this.state.totalItems}</li>
          <li>navBottom: {this.state.navBottom}</li>
          <li>
            imageListPositions: {this.state.imageListPositions.join(", ")}
          </li>
          <li>Loaded Images: {this.state.loadedImages}</li>
          <li>done: {this.state.done ? "true" : "false"}</li>
        </State>
      </div>
    );
  }
}
