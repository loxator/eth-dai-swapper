import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { injected } from "../../components/Wallet/connector";
import Web3 from "web3";
import {
  DAI_TOKEN_ADDRESS,
  INFURA_API,
  UNISWAP_TOKEN_ADDRESS,
} from "../../contstants/constants";
import daiABI from "../../contstants/daiABI.json";
import { AbiItem } from "web3-utils";
import getABI from "../../api/getABI";
import ethUtil from "ethereumjs-util";
import { makeSwap } from "../../utils/Uniswap";

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

type Props = {
  ethPriceInUsd: number;
};

const Swap: React.FC<Props> = ({ ethPriceInUsd }) => {
  const { active, account, library, activate, deactivate } = useWeb3React();
  console.log("🚀 ~ file: Swap.tsx ~ line 93 ~ library", library);
  const [currentStep, setcurrentStep] = useState("Connect");
  const [accountBalance, setaccountBalance] = useState("");
  const [maxAccountBalance, setmaxAccountBalance] = useState("");
  const [accountBalanceInDecimal, setaccountBalanceInDecimal] = useState(0);
  const [maxAccountBalanceInDecimal, setmaxAccountBalanceInDecimal] =
    useState(0);
  const [errorMessage, seterrorMessage] = useState("");

  library && library.setProvider(Web3.givenProvider);
  const getBalance = async (contract: any, walletAddress: any) => {
    let balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  };

  useEffect(() => {
    if (account) {
      let contract: any;
      getABI(DAI_TOKEN_ADDRESS)
        .then((res) => {
          contract = new library.eth.Contract(
            res as unknown as AbiItem,
            DAI_TOKEN_ADDRESS
          );
        })
        .then(() =>
          getBalance(contract, account).then(function (result) {
            setmaxAccountBalance(library.utils.fromWei(result));
            setmaxAccountBalanceInDecimal(
              parseFloat(library.utils.fromWei(result)).toFixed(
                3
              ) as unknown as number
            );
          })
        );
    }
  }, [account]);
  const resetState = () => {
    setcurrentStep("Connect");
    setaccountBalance("");
    setmaxAccountBalance("");
    setaccountBalanceInDecimal(0);
    setmaxAccountBalanceInDecimal(0);
    seterrorMessage("");
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      parseFloat(e.target.value) > maxAccountBalanceInDecimal ||
      parseFloat(e.target.value) < 0
    ) {
      seterrorMessage("Insufficient Balance");
    } else {
      seterrorMessage("");
    }
    setaccountBalance(e.target.value);
  };

  const connect = async () => {
    try {
      await activate(injected);
      setcurrentStep("Swap");
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
          />
        ) : (
          <Label>Not connected</Label>
        )}
        {active && (
          <div>
            <Label>{maxAccountBalanceInDecimal}</Label>
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
            {accountBalance && ethPriceInUsd * parseFloat(accountBalance)}
          </Label>
        ) : (
          <Label>Not connected</Label>
        )}
      </InfoDiv>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => connect()} disabled={!!errorMessage}>
          <Label>{currentStep}</Label>
        </Button>

        <Button onClick={disconnect} disabled={!active}>
          <Label>Disconnect</Label>
        </Button>
      </div>
      {errorMessage && <Label className="error">{errorMessage}</Label>}

      {!!(library && account) && (
        <button
          style={{
            height: "3rem",
            borderRadius: "1rem",
            cursor: "pointer",
          }}
          onClick={async () => {
            // const signature = await library.eth.personal.sign(
            //   "Helloooos",
            //   account
            // );
            // const signingAddress = await library.eth.personal.ecRecover(
            //   "Helloooos",
            //   signature
            // );
            let uniContract: any = new library.eth.Contract(
              await getABI(UNISWAP_TOKEN_ADDRESS),
              UNISWAP_TOKEN_ADDRESS
            );
            let daiContract: any = new library.eth.Contract(
              await getABI(DAI_TOKEN_ADDRESS),
              DAI_TOKEN_ADDRESS
            );
            makeSwap(uniContract, daiContract, account, library, "1");
          }}
        >
          Sign Message
        </button>
      )}
    </Layout>
  );
};

export default Swap;
