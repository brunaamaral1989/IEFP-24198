import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import TabsNavigator from "./navigation/TabsNavigator";
import AuthStack from "./navigation/AuthStack";

function Routes() {
  const { user } = useAuth();
  return user ? <TabsNavigator /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}


