import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { provider } from "web3-core";
import Swap from "./scenes/Swap/Swap";
import GlobalStyle from "./styles/GlobalStyles";
import Price from "./components/Price/Price";
import PriceContextWrapper from "./contextWrappers/PriceContextWrapper";
import LoadingContextWrapper from "./contextWrappers/LoadingContextWrapper";

const getLibrary = (web3Provider: provider) => {
  return new Web3(web3Provider);
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalStyle />
      <LoadingContextWrapper>
        <div className="App">
          <PriceContextWrapper>
            <Price />
            <Swap />
          </PriceContextWrapper>
        </div>
      </LoadingContextWrapper>
    </Web3ReactProvider>
  );
}

export default App;
