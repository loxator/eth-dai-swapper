import PriceContext from "../context/PriceContext";
import { useState, useEffect } from "react";
import { getPrice } from "../utils/Uniswap";
import { useContext } from "react";
import LoadingContext, { LoadingContextProps } from "../context/LoadingContext";
const PriceContextWrapper: React.FC = ({ children }) => {
  const [ethPriceinUSD, setethPriceinUSD] = useState(0);
  const [daiPriceInEth, setdaiPriceInEth] = useState(0);
  const { setIsLoading } = useContext(LoadingContext) as LoadingContextProps;
  useEffect(() => {
    setIsLoading(true);
    getPrice().then((currentPrice) => {
      setethPriceinUSD(parseFloat(currentPrice.eth));
      setdaiPriceInEth(parseFloat(currentPrice.dai));
      setIsLoading(false);
    });
  }, []);

  return (
    <PriceContext.Provider value={{ ethPriceinUSD, daiPriceInEth }}>
      {children}
    </PriceContext.Provider>
  );
};

export default PriceContextWrapper;
