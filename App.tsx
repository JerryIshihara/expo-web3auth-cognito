import "./global";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider } from "native-base";
import * as Linking from "expo-linking";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { AuthContextProvider } from "./src/context/auth";
import { AlertContextProvider } from "./src/context/alert";

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
