import {Account, Client, Databases} from 'react-native-appwrite';

const client = new Client()
.setEndpoint("https://fra.cloud.appwrite.io/v1")
.setProject("68f3a567002aa21e3521")
.setPlatform("co.viraj.habittracker")

export const account = new Account(client);