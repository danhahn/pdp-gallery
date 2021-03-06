import styled from "styled-components";

export const StyledSwipe = styled.div`
  &.fade {
    transition: all 1s;
    .image-panel {
      img {
        opacity: 0;
        transition: all 1s;
      }
      .quickview-container {
        opacity: 0;
        transition: all 1s;
      }
    }
    li {
      opacity: 0;
      transition: all 1s;
    }
  }
  &.fade&.fade-return {
    .image-panel {
      img {
        opacity: 1;
      }
      .quickview-container {
        opacity: 1;
      }
    }
    li {
      opacity: 1;
    }
  }
`;

export const Inner = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .image-panel {
    background-color: #f6f6f6;
  }
  img {
    transition: all 100ms;
    max-width: 100%;
  }
  p {
    transition: all 1s;
    margin: 1em;
  }
  li,
  .quickview-container {
    transition: all 100ms;
  }
`;

export const CustomButtonPrev = styled.button`
  outline: none;
  border: none;
  width: 65px;
  height: 29px;
  left: 0;
  top: 227px;
  margin-top: 0;
  transform: translateY(-50%);
  background-size: 35px 11px;
  background-color: rgba(255, 255, 255, 0.7);
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 35 11' xmlns='http://www.w3.org/2000/svg' width='35' height='11'%3E%3Cpolygon points='0 11 17.5 1.14 35 11 35 9.86 17.5 0 0 9.86' fill='%23707070'/%3E%3C/svg%3E");
  transition: background-color 750ms;
  @media screen and (max-width: 510px) {
    display: none;
  }
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 1);
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 35 11' xmlns='http://www.w3.org/2000/svg' width='35' height='11'%3E%3Cpolygon points='0 11 17.5 1.14 35 11 35 9.86 17.5 0 0 9.86' fill='%23000000'/%3E%3C/svg%3E");
  }
`;

export const CustomButtonNext = styled(CustomButtonPrev)`
  left: inherit;
  right: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 35 11' width='35' height='11'%3E%3Cpolygon points='35 0 17.5 9.9 0 0 0 1.1 17.5 11 35 1.1 35 0' style='fill:%23707070'/%3E%3C/svg%3E%0A");
  &:hover,
  &:focus {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 35 11' width='35' height='11'%3E%3Cpolygon points='35 0 17.5 9.9 0 0 0 1.1 17.5 11 35 1.1 35 0' style='fill:%23000000'/%3E%3C/svg%3E%0A");
  }
`;
