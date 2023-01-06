import React, { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Auth, Hub } from "aws-amplify";

import Web3Auth from "src/context/auth/web3auth";
import { AWSCognito } from "./aws-cognito";

interface AuthContextProps {
	loading: boolean;
	cognitoUser: object | undefined;
	web3AuthInfo: object | undefined;
	login: () => void;
	signout: () => void;
	loginWithGoogle: () => void;
	loginWithApple: () => void;
	logiWithCryptoWallet: () => void;
}

export const AuthContext = React.createContext<Partial<AuthContextProps>>({ loading: false });

export const AuthContextProvider = (props: any) => {
	const connector = useWalletConnect();
	const [loading, setLoading] = useState<boolean>(false);
	const [web3AuthInfo, setWeb3AuthInfo] = useState<object | undefined>();
	const [cognitoUser, setCognitoUser] = useState<object | undefined>();

	useEffect(() => {
		const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
			switch (event) {
				case "signIn":
					setCognitoUser(data);
					break;
				case "signOut":
					setCognitoUser(unsubscribe);
					break;
				case "customOAuthState":
					setCognitoUser(data);
			}
		});
		Auth.currentAuthenticatedUser()
			.then(currentUser => {
				console.log(currentUser);
				setCognitoUser(currentUser);
			})
			.catch(() => console.log("Not signed in"));
		return unsubscribe;
	}, []);

	//////////////////////////////// Public Methods //////////////////////////////
	const login = () => {
		setCognitoUser({});
	};
	const signout = async () => {
		await Auth.signOut();
		if (connector.connected) await connector.killSession();
		setCognitoUser(undefined);
		setWeb3AuthInfo(undefined);
	};
	const loginWithGoogle = async () => {
		const { wallet } = await Web3Auth.googleLogin();
		const signMessage = async (m: string) => await wallet.signMessage(m);
		_cognitoSignInWithKeyPair(wallet.address, signMessage);
	};
	const loginWithApple = async () => {
		const { wallet } = await Web3Auth.appleLogin();
		const signMessage = async (m: string) => await wallet.signMessage(m);
		_cognitoSignInWithKeyPair(wallet.address, signMessage);
	};
	const logiWithCryptoWallet = useCallback(async () => {
		console.log(connector.connected);
		if (!connector.connected) await connector.connect();
	}, [connector]);
	useEffect(() => {
		if (connector.connected && !cognitoUser) {
			const address = connector.accounts[0];
			console.log(address);

			const signMessage = async (message: string): Promise<string> => {
				console.log(message);
				const signed = await connector.signPersonalMessage([message, address]);
				console.log(signed);
				return Promise.resolve(signed);
			};
			_cognitoSignInWithKeyPair(address, signMessage);
		}
	}, [!!connector.connected]);

	//////////////////////////////// Private Methods //////////////////////////////
	const _cognitoSignInWithKeyPair = async (address: string, signMessage: (message: string) => Promise<string>) => {
		console.log("account:", address);
		
		setLoading(true);
		setCognitoUser(await AWSCognito.signIn(address, signMessage));
		setLoading(false);
	};

	const logout = async () => {
		await SecureStore.deleteItemAsync("secure_token")
			.then(res => {
				setCognitoUser(undefined);
			})
			.catch(e => {
				console.warn(e);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				loading,
				cognitoUser,
				web3AuthInfo,
				login,
				signout,
				loginWithGoogle,
				loginWithApple,
				logiWithCryptoWallet,
				// getTokenFromSecureStore,
				// logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return React.useContext(AuthContext);
}
