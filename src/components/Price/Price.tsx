import { useState, useEffect } from "react";
import styled from "styled-components";
import Swap from "../../scenes/Swap/Swap";
import { getPrice } from "../../utils/Uniswap";
import Loader from "../Loader/Loader";

const PriceDiv = styled.div`
  padding: 10px;
`;
const Price = () => {
  const [ethPriceinUSD, setethPriceinUSD] = useState(0);
  const [daiPriceInEth, setdaiPriceInEth] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getPrice().then((currentPrice) => {
      setethPriceinUSD(parseFloat(currentPrice.eth));
      setdaiPriceInEth(parseFloat(currentPrice.dai));
      setisLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <PriceDiv>1 ETH :{" Ð " + ethPriceinUSD.toFixed(2)}</PriceDiv>
      <PriceDiv>1 DAI :{" Ξ " + daiPriceInEth}</PriceDiv>
      <Swap ethPriceInUsd={ethPriceinUSD} daiPriceInEth={daiPriceInEth}/>
    </div>
  );
};

export default Price;
