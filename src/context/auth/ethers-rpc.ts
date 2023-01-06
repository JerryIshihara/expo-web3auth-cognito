import "@ethersproject/shims";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { PROVIDER_URL } from "@env"
global.Buffer = global.Buffer || Buffer;

// const process.env.PROVIDER_URL = "https://rpc.ankr.com/eth";

const getChainId = async () => {
	try {
		const ethersProvider = ethers.getDefaultProvider(process.env.PROVIDER_URL);
		const networkDetails = await ethersProvider.getNetwork();
		return networkDetails;
	} catch (error) {
		return error;
	}
};

const getWallet =async (key:string) => {
	const ethersProvider = ethers.getDefaultProvider(PROVIDER_URL);
	const wallet = new ethers.Wallet(key, ethersProvider);
	return wallet
}

const getAccounts = async (key: string) => {
	const wallet = new ethers.Wallet(key);
	const address = await wallet.address;
	return address;
};

const getBalance = async (key: string) => {
	try {
		const ethersProvider = ethers.getDefaultProvider(PROVIDER_URL);
		const wallet = new ethers.Wallet(key, ethersProvider);
		const balance = await wallet.getBalance();
		return balance;
	} catch (error) {
		return error;
	}
};

const sendTransaction = async (key: string) => {
	try {
		const ethersProvider = ethers.getDefaultProvider(process.env.PROVIDER_URL);
		const wallet = new ethers.Wallet(key, ethersProvider);
		const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
		// Convert 1 ether to wei
		const amount = ethers.utils.parseEther("0.001");
		// Submit transaction to the blockchain
		const tx = await wallet.sendTransaction({
			to: destination,
			value: amount,
			maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
			maxFeePerGas: "6000000000000", // Max fee per gas
		});

		return tx;
	} catch (error) {
		return error;
	}
};

const signMessage = async (key: string, message: string): Promise<string> => {
	const ethersProvider = ethers.getDefaultProvider(process.env.PROVIDER_URL);
	const wallet = new ethers.Wallet(key, ethersProvider);
	const signedMessage = await wallet.signMessage(message);
	return signedMessage;
};

export default {
	getChainId,
	getAccounts,
	getBalance,
	sendTransaction,
	signMessage,
	getWallet,
};
