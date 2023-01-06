import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "src/types";
import LoginScreen from "src/screens/auth/login-screen";
import SignupScreen from "src/screens/auth/signup-screen";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNavigator() {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animation: "slide_from_right" }} />
			<AuthStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, animation: "slide_from_left" }} />
		</AuthStack.Navigator>
	);
}
