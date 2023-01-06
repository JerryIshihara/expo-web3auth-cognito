import "react-native-get-random-values";
import "@ethersproject/shims";
import Amplify from "@aws-amplify/core";
import { Auth, Hub } from "aws-amplify";
import RPC from "./ethers-rpc";
import { COGNITO_REGION, COGNITO_POOL_ID, COGNITO_WEB_CLIENT_ID } from "@env";

Amplify.configure({
	aws_project_region: COGNITO_REGION,
	aws_cognito_region: COGNITO_REGION,
	aws_user_pools_id: COGNITO_POOL_ID,
	aws_user_pools_web_client_id: COGNITO_WEB_CLIENT_ID,
});

const intToHex = (nr: any) => {
	return nr.toString(16).padStart(2, "0");
};
const getRandomString = (bytes: any) => {
	const randomValues = new Uint8Array(bytes);
	window.crypto.getRandomValues(randomValues);
	return Array.from(randomValues).map(intToHex).join("");
};

const handleAmplifySignIn = async (address: string) => {
	try {
		const cognitoUser = await Auth.signIn(address);
		return cognitoUser;
	} catch (err: any) {
		/*Cognito doesn't give us a lot of flexibility on error responses
        so we'll have to string match our 'User Not Found' error here
        and create a cognito user with the address as their username if they don't exist*/
		if (err && err.message && err.message.includes("[404]")) {
			const params = {
				username: address,
				password: getRandomString(30),
			};
			await Auth.signUp(params);
			return undefined;
		} else {
			throw err;
		}
	}
};
const checkUser = async () => {
	try {
		const _user = await Auth.currentAuthenticatedUser();
		console.log("got user", _user);
		return _user;
	} catch (err) {
		console.error("checkUser error", err);
	}
};

const signIn = async (address: string, signMessage: (message: string) => Promise<string>) => {
	let cognitoUser = await handleAmplifySignIn(address);
	if (!cognitoUser) {
		cognitoUser = await handleAmplifySignIn(address);
	}
	const messageToSign = cognitoUser.challengeParam.nonce;
	const signature = await signMessage(messageToSign);
	await Auth.sendCustomChallengeAnswer(cognitoUser, signature);
	return await checkUser();
};

const AWSCognito = {
	signIn,
};

export { AWSCognito };
