import { createContext } from "react";
export interface IPriceContext {
  ethPriceinUSD: number;
  daiPriceInEth: number;
}
const PriceContext = createContext<IPriceContext | null>(null);

export default PriceContext;
