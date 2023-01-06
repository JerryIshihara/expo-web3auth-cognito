/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { useAuth } from "src/context/auth";

import ModalScreen from "src/screens/ModalScreen";
import NotFoundScreen from "src/screens/NotFoundScreen";
import { RootStackParamList } from "src/types";
import AuthNavigator from "./auth-navigator";
import BottomTabNavigator from "./bottom-tab-navigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
	const auth = useAuth();
	return (
		<Stack.Navigator>
			{auth.cognitoUser ? (
				<>
					<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false, animation: "fade" }} />
					<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
					<Stack.Group screenOptions={{ presentation: "modal" }}>
						<Stack.Screen name="Modal" component={ModalScreen} />
					</Stack.Group>
				</>
			) : (
				<Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
			)}
		</Stack.Navigator>
	);
}
