import React, { useState, useContext } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Pressable, 
    ScrollView, 
    Alert,
    KeyboardAvoidingView,
    Platform 
} from 'react-native'
import CustomInput from '@/components/CustomInput'
import { RecipeContext } from '@/providers/RecipeProvider'
import { useRouter } from 'expo-router'

const AddRecipe = () => {
    const router = useRouter();
    const { addRecipe, categories } = useContext(RecipeContext);
    const [recipeName, setRecipeName] = useState('');
    const [category, setCategory] = useState('');
    const [area, setArea] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', measurement: '' }]);

    const handleAddIngredient = () => {
        // Only add a new ingredient row if the last one has content
        const lastIngredient = ingredients[ingredients.length - 1];
        if (lastIngredient.name.trim() || lastIngredient.measurement.trim()) {
            setIngredients([...ingredients, { name: '', measurement: '' }]);
        }
    };

    const updateIngredient = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const removeIngredient = (index) => {
        if (ingredients.length > 1) {
            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
        }
    };

    const submitRecipe = () => {
        // Validate required fields
        const validationErrors = [];
        if (!recipeName.trim()) validationErrors.push('Recipe Name');
        if (!category.trim()) validationErrors.push('Category');
        if (!instructions.trim()) validationErrors.push('Instructions');

        if (validationErrors.length > 0) {
            Alert.alert(
                'Validation Error', 
                `Please fill in the following required fields:\n${validationErrors.join(', ')}`
            );
            return;
        }

        // Filter out empty ingredients
        const validIngredients = ingredients.filter(ing => 
            ing.name.trim() || ing.measurement.trim()
        );

        const newRecipe = {
            idMeal: Date.now().toString(),
            strMeal: recipeName.trim(),
            strCategory: category.trim(),
            strArea: area.trim() || 'Unknown',
            strInstructions: instructions.trim(),
            strMealThumb: imageLink.trim() || 'https://via.placeholder.com/300',
            cookTime: cookTime.trim() || '45 mins',
            servings: servings.trim() || '4',
            ingredients: validIngredients
        };

        addRecipe(newRecipe);
        Alert.alert(
            'Success', 
            'Recipe added successfully!',
            [{ 
                text: 'OK', 
                onPress: () => router.back() 
            }]
        );
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <CustomInput 
                    name="Recipe Name *" 
                    value={recipeName}
                    onChange={(text) => setRecipeName(text)} 
                    error={''} 
                />
                <CustomInput 
                    name="Category *" 
                    value={category}
                    onChange={(text) => setCategory(text)} 
                    error={''} 
                    type="dropdown"
                    options={categories.map(cat => cat.strCategory)}
                />
                <CustomInput 
                    name="Area/Cuisine" 
                    value={area}
                    onChange={(text) => setArea(text)} 
                    error={''} 
                />
            <CustomInput 
                name="Instructions" 
                value={instructions}
                onChange={(text) => setInstructions(text)} 
                error={''} 
                multiline 
            />
            <CustomInput 
                name="Image URL" 
                value={imageLink}
                onChange={(text) => setImageLink(text)} 
                error={''} 
            />
            <CustomInput 
                name="Cook Time" 
                value={cookTime}
                onChange={(text) => setCookTime(text)} 
                error={''} 
            />
            <CustomInput 
                name="Servings" 
                value={servings}
                onChange={(text) => setServings(text)} 
                error={''} 
            />

<Text style={styles.sectionTitle}>Ingredients</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <CustomInput 
                            name="Ingredient" 
                            value={ingredient.name}
                            onChange={(text) => updateIngredient(index, 'name', text)} 
                            error={''} 
                            style={styles.halfInput}
                        />
                        <CustomInput 
                            name="Measurement" 
                            value={ingredient.measurement}
                            onChange={(text) => updateIngredient(index, 'measurement', text)} 
                            error={''} 
                            style={styles.halfInput}
                        />
                        {ingredients.length > 1 && (
                            <Pressable 
                                onPress={() => removeIngredient(index)} 
                                style={styles.removeIngredientButton}
                            >
                                <Text style={styles.removeIngredientText}>-</Text>
                            </Pressable>
                        )}
                    </View>
                ))}

                <Pressable onPress={handleAddIngredient} style={styles.addIngredientButton}>
                    <Text style={styles.addIngredientText}>+ Add Ingredient</Text>
                </Pressable>

                <Pressable style={styles.submitButton} onPress={submitRecipe}>
                    <Text style={styles.submitButtonText}>Add Recipe</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    halfInput: {
        width: '48%'
    },
    addIngredientButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    addIngredientText: {
        color: 'white'
    },
    submitButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    removeIngredientButton: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    removeIngredientText: {
        color: 'white',
        fontSize: 18
    }
});