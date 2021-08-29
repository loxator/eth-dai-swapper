import PriceContext from "../context/PriceContext";
import { useState, useEffect } from "react";
import { getPrice } from "../utils/Uniswap";
import { useContext } from "react";
import LoadingContext, { ILoadingContext } from "../context/LoadingContext";
const PriceContextWrapper: React.FC = ({ children }) => {
  const [ethPriceinUSD, setethPriceinUSD] = useState(0);
  const [daiPriceInEth, setdaiPriceInEth] = useState(0);
  const { setIsFullScreenLoading } = useContext(
    LoadingContext
  ) as ILoadingContext;
  
  
  useEffect(() => {
    setIsFullScreenLoading(true);
    getPrice().then((currentPrice) => {
      setethPriceinUSD(parseFloat(currentPrice.eth));
      setdaiPriceInEth(parseFloat(currentPrice.dai));
      setIsFullScreenLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PriceContext.Provider value={{ ethPriceinUSD, daiPriceInEth }}>
      {children}
    </PriceContext.Provider>
  );
};

export default PriceContextWrapper;
