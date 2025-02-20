import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Anidex",
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#CC0000", // Change this to the desired color
      }}
    />
  );
}