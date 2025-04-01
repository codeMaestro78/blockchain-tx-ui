# Blockchain Transaction UI

A React UI component library for tracking and displaying blockchain transactions with real-time updates.

[![npm version](https://img.shields.io/npm/v/blockchain-tx-ui.svg)](https://www.npmjs.com/package/blockchain-tx-ui)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- Real-time transaction status tracking
- Gas usage monitoring
- Block confirmation details
- Customizable refresh intervals
- Status change callbacks
- Clean, responsive UI components

## Installation

```bash
npm install blockchain-tx-ui

```
##  Usage
### TransactionTracker Component

```bash
import React from 'react';
import { TransactionTracker } from 'blockchain-tx-ui';

function App() {
  return (
    <div>
      <h1>Transaction Status</h1>
      <TransactionTracker 
        txHash="0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234"
        providerUrl="https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
        refreshInterval={3000}
        onStatusChange={(status) => console.log(`Transaction status: ${status}`)}
      />
    </div>
  );
}

export default App;

```
## API Reference
### TransactionTracker Prop Type Required Default Description txHash

string

Yes

-

The transaction hash to track providerUrl

string

Yes

-

Ethereum provider URL (Infura, Alchemy, etc.) refreshInterval

number

No

5000

Interval in ms to check for updates onStatusChange

function

No

-

Callback when transaction status changes
## Supported Networks
- Ethereum Mainnet
- Ethereum Testnets (Goerli, Sepolia)
- Other EVM-compatible networks
## Browser Support
- Chrome
- Firefox
- Safari
- Edge
## Development
### Prerequisites
- Node.js >= 14
- npm or yarn

# Clone the repository
git clone https://github.com/codeMaestro78/blockchain-tx-ui.git

# Install dependencies
cd blockchain-tx-ui
npm install

# Build the library
npm run build