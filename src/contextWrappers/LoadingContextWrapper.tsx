import LoadingContext from "../context/LoadingContext";
import { useState } from "react";

const LoadingContextWrapper: React.FC = ({ children }) => {
  const [isFullScreenLoading, setIsFullScreenLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isFullScreenLoading,
        setIsFullScreenLoading,
        isButtonLoading,
        setIsButtonLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextWrapper;
