import React, { Component } from "react";
import styled from "styled-components";
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
`;

const Nav = styled.nav`
  width: 70px;
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

const UpButton = styled(CustomButtonPrev)`
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(0);
  width: 100%;
  display: block;
`;

const DownButton = styled(CustomButtonNext)`
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(0);
  width: 100%;
  display: block;
`;

const Photo = styled.img`
  display: block;
  margin-bottom: 10px;
`;

export default class PdpDesktop extends Component {
  static state = {
    photos: []
  };
  state = {
    selected: 0,
    totalItems: 0,
    navBottom: null,
    imageListPositions: []
  };
  componentDidMount() {
    this.setState({
      totalItems: this.props.photos.length,
      navBottom: Math.round(this.inner.getBoundingClientRect().height),
      imageListPositions: Array.from(this.photos.querySelectorAll("img")).map(
        photo => photo.offsetTop
      )
    });
    window.addEventListener("scroll", this.checkOffSet);
  }

  scrollToImage = selected => {
    const { imageListPositions: pos } = this.state;
    console.log(pos[selected]);
    window.scrollTo({
      top: pos[selected] - 150,
      behavior: "smooth"
    });
  };

  updateSelectedIcon = selected => {
    // this.setState({ selected }, () => this.scrollToImage(selected));
    this.scrollToImage(selected);
  };

  checkOffSet = () => {
    // console.log(this.nav.getBoundingClientRect().top);
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
      .findIndex(number => number > -96);
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
    const { photos } = this.props;
    const { selected } = this.state;
    return (
      <Desktop>
        <Nav innerRef={el => (this.nav = el)}>
          <div className="inner" ref={el => (this.inner = el)}>
            {photos.map((photo, index) => (
              <Icon
                src={photo.url}
                className={selected === index ? "selected" : null}
                onClick={() => this.updateSelectedIcon(index)}
                alt=""
                key={photo.id}
              />
            ))}
            <UpButton onClick={this.decreaseSelectedItem} />
            <DownButton onClick={this.increaseSelectedItem} />
          </div>
        </Nav>
        <section ref={el => (this.photos = el)}>
          {photos.map((photo, index) => (
            <Photo
              src={photo.url}
              className={selected === index ? "selected" : null}
              onClick={() => this.updateSelectedIcon(index)}
              alt=""
              key={`${photo.id}-photo`}
            />
          ))}
        </section>
        <State>
          <li>selected: {this.state.selected}</li>
          <li>totalItems: {this.state.totalItems}</li>
          <li>navBottom: {this.state.navBottom}</li>
          <li>
            imageListPositions: {this.state.imageListPositions.join(", ")}
          </li>
        </State>
      </Desktop>
    );
  }
}
