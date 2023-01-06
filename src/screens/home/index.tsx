import { useEffect } from "react";
import { Button, StyleSheet } from "react-native";

import { useAuth } from "src/context/auth";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";

export default function HomeScreen({ navigation }: any) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>$112,131.00</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 50,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
