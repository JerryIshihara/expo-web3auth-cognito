import React, { useState, useEffect, useCallback } from "react";
import { Alert, Collapse, VStack, HStack, Text, useToast } from "native-base";
import * as SecureStore from "expo-secure-store";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Auth, Hub } from "aws-amplify";

interface PopProps {
	status: "success" | "info" | (string & {}) | "error" | "warning";
	title: string;
}
interface AlertContextProps {
	pop: (props: PopProps) => void;
}

export const AlertContext = React.createContext<Partial<AlertContextProps>>({ });

export const AlertContextProvider = (contextProps: any) => {
	const toast = useToast();
	const [show, setShow] = useState<boolean>(false);
	const [props, setProps] = useState<any>();

	//////////////////////////////// Public Methods //////////////////////////////

	const pop = (props: PopProps) => {
		toast.show({
			placement: "top",
			render: () => {
				return (
					<Alert w="100%" status={props.status}>
						<VStack space={2} flexShrink={1} w="100%">
							<HStack space={2} flexShrink={1}>
								<Alert.Icon mt="1" />
								<Text fontSize="md" color="coolGray.800">
									{props.title}
								</Text>
							</HStack>
						</VStack>
					</Alert>
				);
			},
		});
		setTimeout(() => {
			toast.closeAll();
		}, 3000);
	};

	//////////////////////////////// Private Methods //////////////////////////////

	return (
		<AlertContext.Provider
			value={{
				pop,
			}}
		>
			{contextProps.children}
		</AlertContext.Provider>
	);
};

export function useAlert() {
	return React.useContext(AlertContext);
}
