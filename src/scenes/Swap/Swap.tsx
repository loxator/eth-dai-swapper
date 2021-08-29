import { useState, useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { injected } from "../../components/Wallet/connector";
import Web3 from "web3";
import {
  DAI_TOKEN_ADDRESS,
  UNISWAP_TOKEN_ADDRESS,
} from "../../contstants/constants";

import { AbiItem } from "web3-utils";
import getABI from "../../api/getABI";

import { approve, makeSwap } from "../../utils/Uniswap";
import PriceContext, { PriceContextProps } from "../../context/PriceContext";

const Layout = styled.div`
  width: 710px;
  height: 476px;
  left: 365px;
  top: 313px;
  background: linear-gradient(
    180deg,
    #10171d 0.01%,
    #07020d 21.88%,
    #2bc69d 100%
  );
  border-radius: 30px;
`;
const Title = styled.h3`
  font-style: normal;
  font-weight: 900;
  font-size: 26px;
  line-height: 32px;
  color: #fff4f4;
`;

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  justify-content: space-between;
  width: 525px;
  height: 60px;
  background: #ffffff;
  border: 1px solid #000000;
  margin: 50px auto;
  padding: 10px;
  border-radius: 30px;
`;

const Label = styled.span`
  font-size: 18px;
  line-height: 32px;
  color: #000000;
  padding: 0 10px;
  &.max {
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
  &.error {
    color: red;
  }
`;

const Button = styled.button`
  background: #ffffff;
  border-radius: 30px;
  width: 200px;
  padding: 10px;
  margin: 0 10px;
  &:disabled {
    display: none;
  }
`;

const Input = styled.input`
  font-family: "Montserrat";
  border: none;
  font-size: 20px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// let uniContract: any = new library.eth.Contract(
//     await getABI(UNISWAP_TOKEN_ADDRESS),
//     UNISWAP_TOKEN_ADDRESS
//   );
//   let daiContract: any = new library.eth.Contract(
//     await getABI(DAI_TOKEN_ADDRESS),
//     DAI_TOKEN_ADDRESS
//   );
//   makeSwap(
//     uniContract,
//     daiContract,
//     account,
//     library,
//     accountBalance
//   );

const Swap: React.FC = () => {
  const { daiPriceInEth } = useContext(PriceContext) as PriceContextProps;
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [currentStep, setcurrentStep] = useState("Connect");
  const [accountBalance, setaccountBalance] = useState("");
  const [maxAccountBalance, setmaxAccountBalance] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [uniContract, setuniContract] = useState(null);
  const [daiContract, setdaiContract] = useState(null);

  library && library.setProvider(Web3.givenProvider);
  const getBalance = async (contract: any, walletAddress: any) => {
    let balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  };

  useEffect(() => {
    if (account) {
      const getUserBalance = async () => {
        let contract = new library.eth.Contract(
          await getABI(DAI_TOKEN_ADDRESS),
          DAI_TOKEN_ADDRESS
        );
        setmaxAccountBalance(
          library.utils.fromWei(await getBalance(contract, account))
        );
      };
      getUserBalance();
    }
  }, [account]);

  useEffect(() => {
    if (library) {
      const setContracts = async () => {
        let uniABI = await getABI(UNISWAP_TOKEN_ADDRESS);
        let daiABI = await getABI(DAI_TOKEN_ADDRESS);
        setuniContract(new library.eth.Contract(uniABI, UNISWAP_TOKEN_ADDRESS));
        setdaiContract(new library.eth.Contract(daiABI, DAI_TOKEN_ADDRESS));
      };
      setContracts();
    }
  }, []);
  const resetState = () => {
    setcurrentStep("Connect");
    setaccountBalance("");
    setmaxAccountBalance("");
    seterrorMessage("");
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      parseFloat(e.target.value) > parseFloat(maxAccountBalance) ||
      parseFloat(e.target.value) < 0
    ) {
      seterrorMessage("Insufficient Balance");
    } else {
      seterrorMessage("");
    }
    setaccountBalance(e.target.value);
  };

  const onClickHandler = (currentStep: string) => {
    switch (currentStep) {
      case "Connect":
        connect();
        setcurrentStep("Approve");
        break;
      case "Approve":
        approve(daiContract, account, library, accountBalance);
        setcurrentStep("Swap");
        break;
      case "Swap":
        makeSwap(uniContract, account, library, accountBalance);
        break;
      default:
        break;
    }
  };
  const connect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log("🚀 ~ file: Swap.tsx ~ line 65 ~ connect ~ error", error);
    }
  };
  const disconnect = async () => {
    try {
      await deactivate();
      resetState();
    } catch (error) {
      console.log("🚀 ~ file: Swap.tsx ~ line 75 ~ disconnect ~ error", error);
    }
  };
  return (
    <Layout>
      <Title>Swap</Title>
      <InfoDiv>
        <Label>Ð</Label>

        {active ? (
          <Input
            value={accountBalance}
            onChange={onChangeHandler}
            type="number"
            placeholder="Input Amount"
          />
        ) : (
          <Label>Not connected</Label>
        )}
        {active && (
          <div>
            <Label>{maxAccountBalance}</Label>
            <Label
              className="max"
              onClick={() => setaccountBalance(maxAccountBalance)}
            >
              Max
            </Label>
          </div>
        )}
      </InfoDiv>
      <InfoDiv>
        <Label>Ξ</Label>
        {active ? (
          <Label>
            {accountBalance && daiPriceInEth * parseFloat(accountBalance)}
          </Label>
        ) : (
          <Label>Not connected</Label>
        )}
      </InfoDiv>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => onClickHandler(currentStep)}
          disabled={!!errorMessage}
        >
          <Label>{currentStep}</Label>
        </Button>

        <Button onClick={disconnect} disabled={!active}>
          <Label>Disconnect</Label>
        </Button>
      </div>
      {errorMessage && <Label className="error">{errorMessage}</Label>}
    </Layout>
  );
};

export default Swap;
