import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	padding: {
		paddingHorizontal: 20,
	},
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
    title: {
        marginVertical: 50,
		fontSize: 30,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#2e78b7",
    },


    socialButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
		paddingVertical: 15,
		borderRadius: 5,
		backgroundColor: "#ddd",
		alignItems: "center",
		width: "100%",
		marginVertical: 10,
	},
	socialButtonText: {
		fontWeight: "500",
        color: "#222222",
        marginHorizontal: 5,
	},

    formInput: {
        height: 50,
        padding: 10,
        width: "100%",
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: "#e3e3e3"
    },
});
