import { Overlay } from "react-native-elements";
import { Spinner, VStack, Heading } from "native-base";

interface LoadingProps {
	loading: boolean;
}
 const LoadingOverlay = ({ loading }: LoadingProps) => {
	return (
		<Overlay isVisible={loading} onBackdropPress={() => {}}>
			<VStack space={3} alignItems="center" style={{ margin: 15 }}>
				<Spinner size="lg" accessibilityLabel="Loading posts" />
				<Heading color="primary.500" fontSize="md">
					Loading
				</Heading>
			</VStack>
		</Overlay>
	);
 };

 export default LoadingOverlay
