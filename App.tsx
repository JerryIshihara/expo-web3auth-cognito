import "./global";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider } from "native-base";
import * as Linking from "expo-linking";
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
import { NativeModules } from 'react-native';

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { AuthContextProvider } from "./src/context/auth";
import { AlertContextProvider } from "./src/context/alert";
import { useEffect } from "react";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	useEffect(() => {
		let unsubscribe: any;
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				return;
			}
			unsubscribe = NetInfo.addEventListener(async state => {
				console.log("Connection type", state.type);
				console.log("Is connected?", state.isConnected);
				console.log("ssid", (state.details as any));
				console.warn(await NetInfo.fetch('wifi'));
			});
		})();

		return () => {
			unsubscribe();
		};
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<NativeBaseProvider>
				<WalletConnectProvider
					bridge="https://bridge.walletconnect.org"
					// clientMeta={{
					// 	description: "Connect with WalletConnect",
					// 	url: "https://walletconnect.org",
					// 	icons: ["https://walletconnect.org/walletconnect-logo.png"],
					// 	name: "WalletConnect",
					// }}
					redirectUrl={Linking.createURL("")}
					storageOptions={{
						asyncStorage: AsyncStorage as any,
					}}
				>
					<AlertContextProvider>
						<AuthContextProvider>
							<Navigation colorScheme={colorScheme} />
							<StatusBar />
						</AuthContextProvider>
					</AlertContextProvider>
				</WalletConnectProvider>
			</NativeBaseProvider>
		);
	}
}
