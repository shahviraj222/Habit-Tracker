import { Account, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const HABITS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
export const COMPLETIONS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID!;

//   This is not a function, it’s a TypeScript interface — a type definition that describes the shape (structure) of an object.
export interface RealtimeResponse {
  events: String[];
  payload: any;
}
