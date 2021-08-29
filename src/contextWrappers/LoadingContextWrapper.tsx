import LoadingContext from "../context/LoadingContext";
import { useState } from "react";

const LoadingContextWrapper: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextWrapper;
