import { createContext } from "react";
export interface ILoadingContext {
  isFullScreenLoading: boolean;
  setIsFullScreenLoading: (active: boolean) => void;
  isButtonLoading: boolean;
  setIsButtonLoading: (active: boolean) => void;
}
const LoadingContext = createContext<ILoadingContext | null>(null);

export default LoadingContext;
