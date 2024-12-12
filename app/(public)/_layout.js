import React from 'react';
import { Stack } from 'expo-router';
import * as Linking from 'expo-linking';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Clerk Auth App',
        }}></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Reset Password',
        }}></Stack.Screen>
        <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Recipe Details',
        }}></Stack.Screen>
        <Stack.Screen
        name="add"
        options={{
          headerTitle: 'Add Recipe',
        }}></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
