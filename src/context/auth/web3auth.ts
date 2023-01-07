import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK, LOGIN_PROVIDER_TYPE } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Buffer } from "buffer";

import { WEB3AUTH_CLIENT_ID } from "@env";
import RPC from "./ethers-rpc";
global.Buffer = global.Buffer || Buffer;

const scheme = "myapp";
const resolvedRedirectUrl =
	Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
		? Linking.createURL("web3auth", {})
		: Linking.createURL("web3auth", { scheme });

const web3auth = new Web3Auth(WebBrowser, {
	clientId: WEB3AUTH_CLIENT_ID,
	network: OPENLOGIN_NETWORK.CYAN, // or other networks
});

const socialLogin = async (loginProvider: LOGIN_PROVIDER_TYPE) => {
	const info = await web3auth.login({
		loginProvider: loginProvider,
		redirectUrl: resolvedRedirectUrl,
		mfaLevel: "none",
		curve: "secp256k1",
	});
	return {
		...info,
		wallet: await RPC.getWallet(info.privKey as string),
	};
};
const passwordlessLogin = async (email: string) => {
	const info = await web3auth.login({
		loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
		redirectUrl: resolvedRedirectUrl,
		extraLoginOptions: {
			login_hint: email,
		},
	});
	return {
		...info,
		wallet: await RPC.getWallet(info.privKey as string),
	};
};

const googleLogin = async () => await socialLogin(LOGIN_PROVIDER.GOOGLE);
const appleLogin = async () => await socialLogin(LOGIN_PROVIDER.APPLE);

export default { googleLogin, appleLogin, passwordlessLogin };
