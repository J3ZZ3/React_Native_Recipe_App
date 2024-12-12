import React, { useState, useContext } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput,
    ActivityIndicator 
} from 'react-native';
import FAB from '../../components/FAB';
import RecipeCard from '../../components/UserCard';
import { RecipeContext } from '@/providers/RecipeProvider';

const RecipeList = () => {
    const { recipes, categories, isLoading } = useContext(RecipeContext);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter recipes based on category and search query
    const filteredRecipes = recipes.filter(recipe => 
        (!selectedCategory || recipe.strCategory === selectedCategory) &&
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCategoryButton = ({ item }) => (
        <TouchableOpacity 
            style={[
                styles.categoryButton, 
                selectedCategory === item.strCategory && styles.selectedCategoryButton
            ]}
            onPress={() => {
                setSelectedCategory(
                    selectedCategory === item.strCategory ? null : item.strCategory
                );
                // Reset search when selecting category
                setSearchQuery('');
            }}
        >
            <Text style={styles.categoryButtonText}>{item.strCategory}</Text>
        </TouchableOpacity>
    );

    const renderRecipeCard = ({ item }) => (
        <RecipeCard item={item} />
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6347" />
                <Text style={styles.loadingText}>Loading Recipes...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Recipes..."
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    // Reset category when searching
                    setSelectedCategory(null);
                }}
            />

            <FlatList
                data={categories}
                renderItem={renderCategoryButton}
                keyExtractor={(item) => item.idCategory}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryList}
            />

            <FlatList
                data={filteredRecipes}
                renderItem={renderRecipeCard}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchQuery || selectedCategory 
                                ? "No recipes found" 
                                : "Start exploring recipes!"}
                        </Text>
                    </View>
                )}
            />
            <FAB />
        </View>
    )
}

export default RecipeList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    searchInput: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    categoryList: {
        maxHeight: 60,
        marginBottom: 10
    },
    categoryButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5
    },
    selectedCategoryButton: {
        backgroundColor: '#FF6347'
    },
    categoryButtonText: {
        color: 'black'
    },
    columnWrapper: {
        justifyContent: 'space-between',
        padding: 10
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center'
    },
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
    }
});