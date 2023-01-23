# React Native Expo Authentication with Web3Auth & Cognito

![status badge](https://badgen.net/badge/status/in_dev/yellow)

### Auth Flow
- **Get Public-key/Private-key with Web3Auth**
Login with Web3Auth-supported options (Passwordless, Google, Apple, etc), and get the Public-key/Private-key pair.
- **Get Cognito identity with the key pair**
Login to Cognito with the key pair (relayed by the Web3Auth provider). Cognito will run the custom-auth-flow to authenticate the user. You may follow this [tutorial](https://davbarrick.medium.com/how-to-build-a-serverless-web3-wallet-login-like-opensea-with-metamask-and-cognito-eb93c723f4de).


### Run Demo

- `yarn` to install dependencies
- Delete the duplicated react-native-svg in `@walletconnect` package.
```shell
rm -rf node_modules/@walletconnect/react-native-dapp/node_modules/react-native-svg
```
- Fill `.env.template` and save as `.env`
- `expo start`
