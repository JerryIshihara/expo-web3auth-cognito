import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Avatar } from "native-base";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";

import { useAuth } from "src/context/auth";
import { RootTabScreenProps } from "src/types";

interface DrawerButtonProps {
	title: string;
	iconLeft: (props: any) => JSX.Element;
	iconRight?: (props: any) => JSX.Element;
	onPress?: () => void;
}
const DrawerButton = (props: DrawerButtonProps) => {
	return (
		<Pressable style={state => [styles.button, state.pressed && styles.buttonFocused]} onPress={props.onPress}>
			{props.iconLeft({ size: 25, color: "#999" })}
			<Text style={styles.buttonText}>{props.title}</Text>
			{props.iconRight && props.iconRight({ size: 17, color: "#999", marginLeft: "auto" })}
		</Pressable>
	);
};

export default function HomeDrawer({ navigation }: any) {
	const auth = useAuth();

	return (
		<View style={styles.container}>
			<Avatar
				bg="green.500"
				mr="1"
				size="lg"
				// source={require(avatar)}
			/>
			<View style={styles.buttons}>
				<DrawerButton
					title="Profile"
					iconLeft={(props: any) => <AntDesign {...props} name="profile" />}
					iconRight={(props: any) => <AntDesign {...props} name="right" />}
					onPress={() => navigation.navigate("Profile")}
				/>
				<DrawerButton
					title="Settings"
					iconLeft={(props: any) => <AntDesign {...props} name="setting" />}
					iconRight={(props: any) => <AntDesign {...props} name="right" />}
					onPress={() => navigation.navigate("Settings")}
				/>
				<DrawerButton title="Logout" iconLeft={(props: any) => <MaterialIcons {...props} name="logout" />} onPress={auth.signout} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 30,
		alignItems: "center",
	},
	buttons: {
		width: "100%",
		marginVertical: 20,
		alignItems: "flex-start",
	},
	button: {
		width: "100%",
		padding: 15,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	buttonFocused: {
		backgroundColor: "#eee",
	},
	buttonText: {
		fontSize: 16,
		marginHorizontal: 15,
		color: "#333",
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
