# BBK Token Minting DApp

## Overview

This project is a decentralized application (DApp) that allows users to mint their own BBK tokens. The application is built using React, Tailwind CSS, and shadcn UI components, and interacts with an Ethereum smart contract using the Wagmi library.

## Features

- **Connect Wallet**: Users can connect their Ethereum wallet to the DApp.
- **Mint Tokens**: Users can mint BBK tokens by selecting different amounts ($100, $200, $500, $1000).
- **Transaction Status**: Users can see the transaction hash, waiting confirmation status, and transaction confirmation status.
- **Error Handling**: Errors during the transaction process are displayed to the user.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn UI**: Component library used for buttons, alerts, and other UI elements.
- **Wagmi**: React hooks library for Ethereum.
- **Viem**: Library for Ethereum-related utility functions.

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/bbk-token-minting-dapp.git
    cd bbk-token-minting-dapp
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

