import { createContext } from "react";
export interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: (active: boolean) => void;
}
const LoadingContext = createContext<LoadingContextProps | null>(null);

export default LoadingContext;
