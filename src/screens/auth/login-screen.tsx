import { useCallback } from "react";
import { TouchableOpacity, Text, View, SafeAreaView, TextInput, Pressable } from "react-native";

import { Overlay } from "react-native-elements";
import { Spinner, VStack, Heading } from "native-base";

import { AuthStackScreenProps } from "src/types";
import { useAuth } from "src/context/auth";
import { styles } from "./auth.styles";
import SocialLogin from "./social-login";
import { Button, FormInput } from "./components";

export default function LoginScreen({ navigation }: AuthStackScreenProps<"Login">) {
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
				<Text style={styles.title}>Login</Text>
				<FormInput />
				<Button title="Next" onPress={auth.login} />

				<SocialLogin />
				<Pressable
					onPress={() => {
						navigation.navigate("Signup");
					}}
				>
					<Text style={styles.linkText}>Create an Account</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
