import { useState, useCallback } from "react";
import { TouchableOpacity, Text, View, ColorValue, Image } from "react-native";
import { styles } from "./auth.styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useAuth } from "src/context/auth";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const google = require("src/assets/images/logo-google.png");
const metamask = require("src/assets/images/logo-metamask.png");

interface DividerProps {
	text?: String;
	color?: ColorValue;
	space?: number;
}
const Divider = (props: DividerProps) => {
	const color = props.color || "#000";
	return (
		<View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: props.space || 0 }}>
			<View style={{ height: 0.5, backgroundColor: color, flex: 1 }} />
			{props.text && <Text style={{ marginHorizontal: 20, color }}>{props.text}</Text>}
			<View style={{ height: 0.5, backgroundColor: color, flex: 1 }} />
		</View>
	);
};

export default function SocialLogin() {
	const auth = useAuth();
	const connector = useWalletConnect();


	return (
		<View style={{ width: "100%", marginBottom: 30 }}>
			<Divider text={"or"} color="#555" space={30} />
			<TouchableOpacity onPress={auth.loginWithGoogle} style={styles.socialButton}>
				<Image source={google} style={{ width: 17, height: 17 }} />
				<Text style={styles.socialButtonText}>Continue with Google</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={auth.loginWithApple} style={styles.socialButton}>
				<AntDesign name="apple1" size={17} color="black" style={{ marginTop: -3 }} />
				<Text style={styles.socialButtonText}>Continue with Apple</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={auth.logiWithCryptoWallet} style={styles.socialButton}>
				{/* <Image source={metamask} style={{ width: 17, height: 17 }} /> */}
				<Ionicons name="wallet" size={17} color="black" />
				<Text style={styles.socialButtonText}>Continue with Wallet</Text>
			</TouchableOpacity>
		</View>
	);
}
