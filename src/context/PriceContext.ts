import { createContext } from "react";
export interface PriceContextProps {
  ethPriceinUSD: number;
  daiPriceInEth: number;
}
const PriceContext = createContext<PriceContextProps | null>(null);

export default PriceContext;
