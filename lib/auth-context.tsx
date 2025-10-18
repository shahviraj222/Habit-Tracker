// this file is contex

// Context (AuthContext + AuthProvider) → manages state and methods globally and provides them to any component in your app.

// Custom hook (useAuth) → is a convenient, safe way for your components to access that context without repeating useContext(AuthContext) everywhere.
 

/* 
Auth Context + Custom Hook Explained

1.AuthContext

    React Context object.

    Holds the shared state and functions for authentication.

    Doesn’t manage state by itself.

2.AuthProvider

    React component that wraps your app.

    Manages auth state (user, isLoadingUser) with useState.

    Provides auth functions (signUp, signIn, signOut) via the context.

    Any component inside it can access auth data.

3.useAuth

    Custom hook. ✅

    Shortcut for consuming AuthContext.

    Safe: throws error if used outside of AuthProvider.

    Makes accessing auth state in components clean and simple.

4.How they work together

    AuthProvider wraps the app → provides context.

    useAuth() inside a component → reads/writes the context state.
*/


import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "An error occured during signup";
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "An error occured during sign in";
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// this is custom hook through which we access auth context like functions and data
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of the AuthProvider");
  }

  return context;
}