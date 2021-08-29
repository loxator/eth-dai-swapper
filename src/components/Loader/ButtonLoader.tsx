import React from "react";
import loadingSVG from "../../resources/ripple.svg";
import styled from "styled-components";
const Image = styled.img`
  width: 2rem;
  height: 2rem;
`;
const ButtonLoader = () => {
  return <Image src={loadingSVG} />;
};

export default ButtonLoader;
