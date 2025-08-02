import { StyleSheet } from "react-native";

// Brand color palette
const COLORS = {
  primary: "#4cc169ff",    // app green
  secondary: "#303030ff",  // dark text
  background: "#ffffffff", // white
};

export { COLORS };

// Shared styles used across all screens
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: "TedNext-Regular", // TED font used as semi-bold
    fontSize: 26,
    marginBottom: 30,
    color: COLORS.secondary,
    textAlign: "center",
  },
  sectionTitle: {
    fontFamily: "TedNext-Regular",
    fontSize: 20,
    marginBottom: 20,
    color: COLORS.secondary,
    textAlign: "center",
  },
  text: {
    fontFamily: "TedNext-Regular",
    fontSize: 18,
    color: COLORS.secondary,
    textAlign: "center",
  },
  italicText: {
    fontFamily: "TedNext-Italic", // Optional use for notes or disclaimers
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    fontFamily: "TedNext-Regular",
    fontSize: 18,
    color: COLORS.background,
  },
  textInput: {
    width: "80%",
    fontFamily: "TedNext-Regular",
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
});
