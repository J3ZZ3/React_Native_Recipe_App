import { StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { RecipeProvider } from '../../providers/RecipeProvider';

const RecipeLayout = () => {
    return (
        <RecipeProvider>
            <Stack 
                screenOptions={{
                    headerStyle: { backgroundColor: '#FF6347' },
                    headerTintColor: 'white',
                    headerTitleStyle: { fontWeight: 'bold' }
                }}
            >
                <Stack.Screen 
                    name="index" 
                    options={{
                        headerTitle: 'Recipes',
                    }} 
                />
                <Stack.Screen 
                    name="[id]" 
                    options={{
                        headerTitle: 'Recipe Details',
                    }} 
                />
                <Stack.Screen 
                    name="add" 
                    options={{
                        headerTitle: 'Add New Recipe',
                    }} 
                />
            </Stack>
        </RecipeProvider>
    )
}

export default RecipeLayout;