import { useContext } from "react";
import PriceContext, { PriceContextProps } from "../../context/PriceContext";
import LoadingContext, {
  LoadingContextProps,
} from "../../context/LoadingContext";
import styled from "styled-components";

import Loader from "../../components/Loader/Loader";

const PriceDiv = styled.div`
  padding: 10px;
`;
const Price: React.FC = () => {
  const { ethPriceinUSD, daiPriceInEth } = useContext(
    PriceContext
  ) as PriceContextProps;

  const { isLoading } = useContext(LoadingContext) as LoadingContextProps;
  return (
    <div>
      {isLoading && <Loader />}
      <PriceDiv>1 ETH :{" Ð " + ethPriceinUSD.toFixed(2)}</PriceDiv>
      <PriceDiv>1 DAI :{" Ξ " + daiPriceInEth}</PriceDiv>
    </div>
  );
};

export default Price;
