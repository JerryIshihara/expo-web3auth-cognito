import { useState } from "react";
import { Text, View, SafeAreaView, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Spinner, VStack, useToast } from "native-base";

import { AuthStackScreenProps } from "src/types";
import { useAuth } from "src/context/auth";
import { styles } from "./auth.styles";
import SocialLogin from "./social-login";
import { Button } from "./components";
import { useAlert } from "src/context/alert";

interface FormProps {
	onSubmit?: (email: string) => void;
}
export const FormInput = (props: FormProps) => {
	const alert = useAlert();
	const toast = useToast();
	const [value, setValue] = useState<string>();
	const next = () => {
		if (props.onSubmit && value && value.length > 0) {
			props.onSubmit(value);
		} else {
			alert.pop &&
				alert.pop({
					status: "warning",
					title: "Invalid email",
				});
		}
	};
	return (
		<VStack style={{ width: "100%" }} space={3}>
			<View style={{ width: "100%" }}>
				<Text style={{ color: "#999" }}>Email</Text>
				<TextInput
					autoComplete="email"
					defaultValue={value}
					onChangeText={newText => setValue(newText)}
					style={styles.formInput}
					clearButtonMode="while-editing"
				/>
			</View>
			<Button title="Next" onPress={next} />
		</VStack>
	);
};

export default function LoginScreen({ navigation }: AuthStackScreenProps<"Login">) {
	const auth = useAuth();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView>
				<View style={{ ...styles.container, ...styles.padding }}>
					<Text style={styles.title}>Login</Text>
					<FormInput onSubmit={(email: string) => auth.login && auth.login({ type: "email", email })} />

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
		</TouchableWithoutFeedback>
	);
}
