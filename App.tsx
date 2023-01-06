import "./global";
import { registerRootComponent } from "expo";
import { Platform } from "react-native";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider } from "native-base";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { AuthContextProvider } from "./src/context/auth";


export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

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
					redirectUrl={"myapp://"}
					storageOptions={{
						asyncStorage: AsyncStorage as any,
					}}
				>
				<AuthContextProvider>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</AuthContextProvider>
				</WalletConnectProvider>
			</NativeBaseProvider>
		);
	}
}