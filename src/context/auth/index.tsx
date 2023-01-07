import React, { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Auth, Hub } from "aws-amplify";

import Web3Auth from "src/context/auth/web3auth";
import { AWSCognito } from "./aws-cognito";
import { useAlert } from "../alert";

type LOGIN_TYPE = "google" | "email" | "apple";
interface LoginProps {
	type: LOGIN_TYPE;
	email?: string;
}
interface AuthContextProps {
	loading: boolean;
	cognitoUser: any | undefined;
	web3AuthInfo: object | undefined;
	signout: () => void;
	login: (props: LoginProps) => void;
	// loginWithEmail: (email: string) => void;
	// loginWithGoogle: () => void;
	// loginWithApple: () => void;
	loginWithCryptoWallet: () => void;
}

export const AuthContext = React.createContext<Partial<AuthContextProps>>({ loading: false });

export const AuthContextProvider = (props: any) => {
	const alert = useAlert();
	const connector = useWalletConnect();
	const [loading, setLoading] = useState<boolean>(false);
	const [web3AuthInfo, setWeb3AuthInfo] = useState<object | undefined>();
	const [cognitoUser, setCognitoUser] = useState<any | undefined>();

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
	const signout = async () => {
		setLoading(true);
		if (cognitoUser) await Auth.signOut();
		if (connector.connected) await connector.killSession();
		setLoading(false);
		setCognitoUser(undefined);
		setWeb3AuthInfo(undefined);
	};

	// const loginWithEmail = async (email: string) => {
	// 	const { wallet } = await Web3Auth.passwordlessLogin(email);
	// 	const signMessage = async (m: string) => await wallet.signMessage(m);
	// 	_cognitoSignInWithKeyPair(wallet.address, signMessage);
	// };
	// const loginWithGoogle = async () => {
	// 	const { wallet } = await Web3Auth.googleLogin();
	// 	const signMessage = async (m: string) => await wallet.signMessage(m);
	// 	_cognitoSignInWithKeyPair(wallet.address, signMessage);
	// };
	// const loginWithApple = async () => {
	// 	const { wallet } = await Web3Auth.appleLogin();
	// 	const signMessage = async (m: string) => await wallet.signMessage(m);
	// 	_cognitoSignInWithKeyPair(wallet.address, signMessage);
	// };

	const login = async (props: LoginProps) => {
		try {
			let info: any;
			switch (props.type) {
				case "google":
					info = await Web3Auth.googleLogin();
					break;
				case "apple":
					info = await Web3Auth.appleLogin();
					break;
				case "email":
					if (!props.email) throw new Error();
					info = await Web3Auth.passwordlessLogin(props.email as string);
				default:
					break;
			}
			if (!info || !info.wallet) throw new Error();
			const signMessage = async (m: string) => await info.wallet.signMessage(m);
			_cognitoSignInWithKeyPair(info.wallet.address, signMessage);
		} catch {
			alert.pop && alert.pop({ status: "error", title: "Login failed, please try again" });
		}
	};
	const loginWithCryptoWallet = useCallback(async () => {
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

	return (
		<AuthContext.Provider
			value={{
				loading,
				cognitoUser,
				web3AuthInfo,
				signout,
				login,
				// loginWithEmail,
				// loginWithGoogle,
				// loginWithApple,
				loginWithCryptoWallet,
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
