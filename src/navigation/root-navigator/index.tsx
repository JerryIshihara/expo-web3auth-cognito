import { useEffect } from "react";
import { Pressable, View, Text } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, getDrawerStatusFromState } from "@react-navigation/drawer";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

import Colors from "src/constants/Colors";
import useColorScheme from "src/hooks/useColorScheme";
import { RootTabParamList, RootTabScreenProps } from "src/types";
import HomeScreen from "src/screens/home";
import ProfileScreen from "src/screens/profile";
import SettingsScreen from "src/screens/settings";
import HomeScreenDrawer from "src/screens/home/drawer";
import BottomTabNavigator from "./bottom-tab-navigator";

function DrawerContent(props: any) {
	return (
		<DrawerContentScrollView {...props}>
			<HomeScreenDrawer {...props}/>
		</DrawerContentScrollView>
	);
}

const Drawer = createDrawerNavigator();
export default function RootNavigator(props: any) {
    const colorScheme = useColorScheme();
	return (
		<Drawer.Navigator
			screenOptions={{
				headerTitle: "",
				headerStyle: {
					elevation: 0, // remove shadow on Android
					shadowOpacity: 0, // remove shadow on iOS
				},
			}}
			drawerContent={props => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name="RootTab"
				component={BottomTabNavigator}
				options={({ navigation }: any) => ({
					headerShown: false
				})}
			/>
		</Drawer.Navigator>
	);
}


