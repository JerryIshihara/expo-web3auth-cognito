import { Pressable, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";

import Colors from "src/constants/Colors";
import useColorScheme from "src/hooks/useColorScheme";
import TabTwoScreen from "src/screens/TabTwoScreen";
import { RootTabParamList, RootTabScreenProps } from "src/types";
import HomeScreen from "src/screens/home";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator({ navigation} : any) {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
				tabBarInactiveTintColor: Colors[colorScheme].inactive,
				tabBarShowLabel: false,
				headerStyle: {
					elevation: 0, // remove shadow on Android
					shadowOpacity: 0, // remove shadow on iOS
				},
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={({ navigation }: any) => ({
					title: "",
					headerLeft: () => (
						<Pressable
							onPress={() => {
								navigation.openDrawer();
							}}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome5 name="bars" size={20} color={Colors[colorScheme].text} style={{ marginLeft: 25 }} />
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate("Modal")}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome5 name="info-circle" size={20} color={Colors[colorScheme].text} style={{ marginRight: 25 }} />
						</Pressable>
					),
					tabBarIcon: ({ color }) => <Foundation name="home" color={color} size={30} />,
				})}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={TabTwoScreen}
				options={{
					title: "Tab Two",
					headerShown: false,
					tabBarIcon: ({ color }) => <Ionicons name="wallet" color={color} size={30} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}
