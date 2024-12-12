import React, { useContext, useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ScrollView, 
    ActivityIndicator,
    Alert,
    Pressable 
} from 'react-native';
import { RecipeContext } from '@/providers/RecipeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const RecipeDetail = () => {
    const { recipes, deleteRecipe } = useContext(RecipeContext);
    const router = useRouter();
    const params = useLocalSearchParams();
    const [mealData, setMealData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find the recipe in the existing recipes array
        const foundRecipe = recipes.find(recipe => 
            recipe.idMeal === params.id || 
            recipe.strMeal.toLowerCase() === decodeURIComponent(params.id).toLowerCase()
        );

        if (foundRecipe) {
            setMealData(foundRecipe);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [params.id, recipes]);

    const handleDeleteRecipe = () => {
        Alert.alert(
            'Delete Recipe',
            'Are you sure you want to delete this recipe?',
            [
                { 
                    text: 'Cancel', 
                    style: 'cancel' 
                },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: () => {
                        deleteRecipe(mealData.idMeal);
                        router.back();
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6347" />
                <Text style={styles.loadingText}>Loading Recipe Details...</Text>
            </View>
        );
    }

    if (!mealData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Recipe not found</Text>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: mealData.strMealThumb || 'https://via.placeholder.com/300' }} 
                    style={styles.image} 
                />
                <Pressable 
                    style={styles.deleteButton} 
                    onPress={handleDeleteRecipe}
                >
                    <Ionicons name="trash" size={24} color="white" />
                </Pressable>
            </View>
            
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{mealData.strMeal}</Text>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Category: {mealData.strCategory || 'Unknown'}</Text>
                    <Text style={styles.infoLabel}>Area: {mealData.strArea || 'Unknown'}</Text>
                    <Text style={styles.infoLabel}>Cook Time: {mealData.cookTime || '45 mins'}</Text>
                    <Text style={styles.infoLabel}>Servings: {mealData.servings || '4'}</Text>
                </View>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                {mealData.ingredients?.length > 0 ? (
                    mealData.ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.ingredient}>
                            {ingredient.name} - {ingredient.measurement}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noIngredientsText}>No ingredients found</Text>
                )}

                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.instructions}>
                    {mealData.strInstructions || 'No instructions available'}
                </Text>
            </View>
        </ScrollView>
    )
}

export default RecipeDetail;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    errorText: {
        fontSize: 18,
        color: '#FF6347'
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 250
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,0,0,0.7)',
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        padding: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
    },
    infoLabel: {
        marginRight: 10,
        color: '#666'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10
    },
    ingredient: {
        marginBottom: 5
    },
    instructions: {
        lineHeight: 22
    },
    backButton: {
      backgroundColor: '#FF6347',
      padding: 10,
      borderRadius: 5,
      marginTop: 10
  },
  backButtonText: {
      color: 'white',
      textAlign: 'center'
  },
  noIngredientsText: {
      color: '#888',
      fontStyle: 'italic'
  }
});