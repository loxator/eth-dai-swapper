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
import {
  DAI_TOKEN_ADDRESS,
  INFURA_API,
  UNISWAP_TOKEN_ADDRESS,
} from "../contstants/constants";
const chainId = ChainId.ROPSTEN;

export const getPrice = async () => {
  const DAI: Token = await Fetcher.fetchTokenData(chainId, DAI_TOKEN_ADDRESS);
  const pair: Pair = await Fetcher.fetchPairData(DAI, WETH[chainId]);
  const route: Route = new Route([pair], WETH[chainId]);
  return {
    eth: route.midPrice.toSignificant(6),
    dai: route.midPrice.invert().toSignificant(6),
  };
};

export const approve = async (
  daiContract: any | null,
  account: string | null | undefined,
  library: any,
  value: string
) => {
  let count = await library.eth.getTransactionCount(account);
  await daiContract.methods.approve(UNISWAP_TOKEN_ADDRESS, value).send({
    from: account,
    gasLimit: await library.eth.getBlock("latest").gasLimit,
    gasPrice: await library.eth.getGasPrice(),
    nonce: library.utils.toHex(count),
  });
};
export const makeSwap = async (
  uniContract: any | null,
  account: string | null | undefined,
  library: any,
  amount: string
) => {
  const DAI: Token = await Fetcher.fetchTokenData(chainId, DAI_TOKEN_ADDRESS);
  const pair: Pair = await Fetcher.fetchPairData(DAI, WETH[chainId]);
  const route: Route = new Route([pair], DAI);
  const trade = new Trade(
    route,
    new TokenAmount(DAI, library.utils.toWei(amount.toString())),
    TradeType.EXACT_INPUT
  );

  const slippageTolerance = new Percent("50", "10000"); //0.5%
  const amountOutMin = ethers.BigNumber.from(
    trade.minimumAmountOut(slippageTolerance).raw.toString()
  ).toHexString();
  const path = [DAI.address, WETH[chainId].address];
  const to = account;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
  const value = ethers.BigNumber.from(
    trade.inputAmount.raw.toString()
  ).toHexString();

  const data = await uniContract.methods
    .swapExactTokensForETH(value, amountOutMin, path, to, deadline)
    .send({
      from: account,
    });
  console.log("🚀 ~ file: Uniswap.ts ~ line 67 ~ data", data);

  // console.log(`Transaction hash: ${tx.hash}`);
  // const receipt = await tx.wait();
  // console.log(`Transaction was mined in block ${receipt.blockNumber}`);
};
