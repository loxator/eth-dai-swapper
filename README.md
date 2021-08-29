# SwapAway

This is a simple DAI / ETH Swapper which leverages Uniswaps Router V2 `swapExactTokensForEth` contract method, to do a market buy by converting the user's DAI to ETH, at the current price.

The project can only run on `MAINNET`, but can be tested on `ROPSTEN` by commenting out and replacing the lines within the code.

## How to run

Run `yarn && yarn start`, to install dependencies and then start the local development server.


## Change to test network

- In `getABI.js` file, the url will be `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${ETHERSCAN_API_KEY}`

- In `constants.js`, use the commented address for DAI, which is a smart contract on the Ropsten Network

- In `Uniswap.ts`, change `const chainId = ChainId.MAINNET;` to `const chainId = ChainId.Ropsten`;

- Comment out lines `246, 247 & 248` in `Swap.tsx`