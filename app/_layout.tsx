// app/_layout.js
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { use, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user, isLoadingUser } = useAuth();

  // segment helps to find where the user is (on which route)
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup && !isLoadingUser) {
      setTimeout(() => {
        router.replace("/auth");
      }, 100); // small delay to ensure RootLayout is mounted
    } else if (user && inAuthGroup && !isLoadingUser) {
      setTimeout(() => {
        router.replace("/");
      }, 100);
    }
  }, [user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    // auth provider wraps the whole app so that auth state is available everywhere
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
