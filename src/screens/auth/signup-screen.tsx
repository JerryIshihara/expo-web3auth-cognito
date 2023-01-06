import { useState } from "react";
import { TouchableOpacity, Text, View, SafeAreaView, TextInput, ColorValue, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Spinner, VStack, HStack, Heading } from "native-base";
import { Overlay } from "react-native-elements";

import { AuthStackScreenProps } from "src/types";
import { styles } from "./auth.styles";
import { useAuth } from "src/context/auth";
import SocialLogin from "./social-login";
import { Button } from './components';


export default function SignupScreen({ navigation }: AuthStackScreenProps<"Signup">) {
	const auth = useAuth();
	return (
		<SafeAreaView>
			<Overlay isVisible={auth.loading || false} onBackdropPress={() => {}}>
				<VStack space={3} alignItems="center" style={{ margin: 15 }}>
					<Spinner size="lg" accessibilityLabel="Loading posts" />
					<Heading color="primary.500" fontSize="md">
						Loading
					</Heading>
				</VStack>
			</Overlay>
			<View style={{ ...styles.container, ...styles.padding }}>
				<Text style={styles.title}>Sign up</Text>
				<Button title="Sign up with email" onPress={auth.login} iconLeft={props => <MaterialCommunityIcons name="email" {...props} />} />

				<SocialLogin />

				<HStack space={2}>
					<Text style={{ color: "#777", fontWeight: "500" }}>Already registered?</Text>
					<Pressable
						onPress={() => {
							navigation.navigate("Login");
						}}
					>
						<Text style={styles.linkText}>Log In</Text>
					</Pressable>
				</HStack>
			</View>
		</SafeAreaView>
	);
}
