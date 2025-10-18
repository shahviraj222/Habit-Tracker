import { Tabs } from "expo-router";
import { Text } from "react-native";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveBackgroundColor: "red" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "login",
          tabBarIcon: () => <Text>🔐</Text>,
        }}
      />
    </Tabs>
  );
}
