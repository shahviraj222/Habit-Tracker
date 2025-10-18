// app/_layout.js
import { AuthProvider } from "@/lib/auth-context";
import { Stack, useRouter } from "expo-router";
import { use, useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      setTimeout(() => {
        router.replace("/auth");
      }, 100); // small delay to ensure RootLayout is mounted
    }
  });

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
