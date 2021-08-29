# SwapAway

This is a simple DAI / ETH Swapper which leverages Uniswaps Router V2 `swapExactTokensForEth` contract method, to do a market buy by converting the user's DAI to ETH, at the current price.

The project can only run on `MAINNET`, but can be tested on `ROPSTEN` by commenting out and replacing the lines within the code.

## How to run

Run `yarn && yarn start`, to install dependencies and then start the local development server.