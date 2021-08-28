import {
  ChainId,
  Token,
  Fetcher,
  WETH,
  Pair,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk";
import { ethers } from "ethers";
import { INFURA_API, UNISWAP_TOKEN_ADDRESS } from "../contstants/constants";
const chainId = ChainId.MAINNET;
const DAItokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

export const getPrice = async () => {
  const DAI: Token = await Fetcher.fetchTokenData(chainId, DAItokenAddress);
  const pair: Pair = await Fetcher.fetchPairData(DAI, WETH[chainId]);
  const route: Route = new Route([pair], WETH[chainId]);
  return {
    eth: route.midPrice.toSignificant(6),
    dai: route.midPrice.invert().toSignificant(6),
  };
};

//Doesn't work
export const makeSwap = async (
  uniContract: any,
  daiContract: any,
  account: any,
  library: any,
  amount: any
) => {
  console.log("🚀 ~ file: Uniswap.ts ~ line 35 ~ daiContract", daiContract);
  const DAI: Token = await Fetcher.fetchTokenData(chainId, DAItokenAddress);
  const pair: Pair = await Fetcher.fetchPairData(DAI, WETH[chainId]);
  const route: Route = new Route([pair], DAI);
  const trade = new Trade(
    route,
    new TokenAmount(DAI, library.utils.toWei(amount)),
    TradeType.EXACT_INPUT
  );

  const slippageTolerance = new Percent("50", "10000"); //0.5%
  const amountOutMin = ethers.BigNumber.from(
    trade.minimumAmountOut(slippageTolerance).raw.toString()
  ).toHexString();
  const path = [DAI.address, WETH[chainId].address];
  const to = account;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 1;
  const value = ethers.BigNumber.from(
    trade.inputAmount.raw.toString()
  ).toHexString();

  const tx = await uniContract.methods.swapExactTokensForETH(
    value,
    amountOutMin,
    path,
    to,
    deadline
  );
  console.log("🚀 ~ file: Uniswap.ts ~ line 63 ~ tx", tx);
  let count = await library.eth.getTransactionCount(account);
  console.log("🚀 ~ file: Uniswap.ts ~ line 65 ~ count", count);
  const signature = await library.eth.personal.signTransaction(tx, account);

  console.log(signature);
  // console.log(`Transaction hash: ${tx.hash}`);
  // const receipt = await tx.wait();
  // console.log(`Transaction was mined in block ${receipt.blockNumber}`);
};
