import { Pressable, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, Ionicons } from "@expo/vector-icons";

import Colors from "src/constants/Colors";
import useColorScheme from "src/hooks/useColorScheme";
import TabTwoScreen from "src/screens/TabTwoScreen";
import { RootTabParamList, RootTabScreenProps } from "src/types";
import HomeDrawerNavigator from "./home-drawer-navigator";


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
				tabBarInactiveTintColor: Colors[colorScheme].inactive,
				tabBarShowLabel: false,
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={HomeDrawerNavigator}
				options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
					title: "",
					headerShown: false,
					tabBarIcon: ({ color }) => <Foundation name="home" color={color} size={30} />,
				})}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={TabTwoScreen}
				options={{
					title: "Tab Two",
					tabBarIcon: ({ color }) => <Ionicons name="wallet" color={color} size={30} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
// 	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
