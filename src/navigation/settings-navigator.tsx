import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "src/types";
import LoginScreen from "src/screens/auth/login-screen";
import SignupScreen from "src/screens/auth/signup-screen";

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();
export default function AuthNavigator() {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animation: "slide_from_right" }} />
			<SettingsStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, animation: "slide_from_left" }} />
		</SettingsStack.Navigator>
	);
}
