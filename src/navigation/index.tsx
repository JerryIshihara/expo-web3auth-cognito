import * as React from "react";
import { ColorSchemeName } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "src/context/auth";
import ModalScreen from "src/screens/ModalScreen";
import NotFoundScreen from "src/screens/NotFoundScreen";
import ProfileScreen from "src/screens/profile";
import SettingsScreen from "src/screens/settings";
import { RootStackParamList } from "src/types";
import LoadingOverlay from "src/components/loading-overlay";

import AuthNavigator from "./auth-navigator";
import LinkingConfiguration from "./LinkingConfiguration";
import RootNavigator from "./root-navigator";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	const auth = useAuth();
	return (
		<NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<LoadingOverlay loading={auth.loading || false} />
			<MainNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
function MainNavigator() {
	const auth = useAuth();
	return (
		<Stack.Navigator>
			{auth.cognitoUser ? (
				<>
					<Stack.Screen name="Root" component={RootNavigator} options={{ headerShown: false }} />
					<Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
					<Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "" }} />
					<Stack.Group screenOptions={{ presentation: "modal" }}>
						<Stack.Screen name="Modal" component={ModalScreen} />
					</Stack.Group>
					<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
				</>
			) : (
				<Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false, animation: "fade" }} />
			)}
		</Stack.Navigator>
	);
}
