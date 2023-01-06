import { useEffect } from "react";
import { Pressable, View, Text } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, getDrawerStatusFromState } from "@react-navigation/drawer";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import Colors from "src/constants/Colors";
import useColorScheme from "src/hooks/useColorScheme";
import { RootTabParamList, RootTabScreenProps } from "src/types";
import HomeScreen from "src/screens/home";
import HomeScreenDrawer from "src/screens/home/drawer";

function DrawerContent(props: any) {
	return (
		<DrawerContentScrollView {...props}>
			<HomeScreenDrawer />
		</DrawerContentScrollView>
	);
}

const Drawer = createDrawerNavigator();
export default function HomeDrawerNavigator(props: any) {
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
				name="Home"
				component={HomeScreen}
                options={({ navigation }: any) => ({
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
				})}
			/>
		</Drawer.Navigator>
	);
}
