import { useState } from "react";
import { TouchableOpacity, Text, View, SafeAreaView, TextInput, ColorValue, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Spinner, VStack, HStack, Heading } from "native-base";
import { Overlay } from "react-native-elements";

import { styles } from "./auth.styles";

export const FormInput = () => {
	const [value, setValue] = useState("");
	return (
		<View style={{ width: "100%", marginVertical: 5 }}>
			<Text style={{ color: "#999999" }}>Email</Text>
			<TextInput style={styles.formInput} onChangeText={newText => setValue(newText)} defaultValue={value} />
		</View>
	);
};



interface ButtonProps {
	title: String;
	onPress?: () => void;
	iconLeft?: (props: object) => JSX.Element;
}
export const Button = (props: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				paddingVertical: 15,
				borderRadius: 5,
				backgroundColor: "#46dbaf",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			{props.iconLeft && props.iconLeft({ color: "#222", size: 20, style: { marginRight: 10 } })}
			<Text
				style={{
					fontWeight: "500",
					color: "#222",
					fontSize: 16,
				}}
			>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};
