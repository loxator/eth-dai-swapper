import React from "react";
import loadingSVG from "../../resources/swapaway.svg";
import styled from "styled-components";
const Image = styled.img`
  position: fixed;
  z-index: 999;
  height: 50rem;
  width: 50rem;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #282c34;
`;
const Loader = () => {
  return <Image src={loadingSVG} />;
};

export default Loader;
