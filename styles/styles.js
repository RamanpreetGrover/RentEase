import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#08AF32",
  secondary: "#F8F7F9",
  background: "#54494B",
};

export { COLORS };

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: COLORS.secondary,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.background,
  },
  text: {
    fontSize: 18,
    color: COLORS.secondary,
    textAlign: "center",
  },
  textInput: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
  },

  imageUploadContainer: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 20,
    textAlign: "center",
  },
});
