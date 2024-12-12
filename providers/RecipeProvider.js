import React, { createContext, useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const categoriesApi = `${BASE_URL}/categories.php`;
const recipesApi = `${BASE_URL}/filter.php?c=`;

export const RecipeContext = createContext({
    recipes: [],
    categories: [],
    addRecipe: () => {},
    deleteRecipe: () => {},
    setRecipes: () => {},
    isLoading: false
});

export const RecipeProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [, getFetch] = useFetch();

    // Fetch full recipe details
    const fetchFullRecipeDetails = async (meal) => {
        try {
            const detailResponse = await fetch(`${BASE_URL}/lookup.php?i=${meal.idMeal}`);
            
            if (!detailResponse.ok) {
                console.error(`Failed to fetch details for meal: ${meal.idMeal}`);
                return null;
            }
            
            const detailData = await detailResponse.json();
            
            if (!detailData.meals || detailData.meals.length === 0) {
                console.error(`No details found for meal: ${meal.idMeal}`);
                return null;
            }
            
            const fullMeal = detailData.meals[0];
            
            // Process ingredients
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredientKey = `strIngredient${i}`;
                const measureKey = `strMeasure${i}`;
                
                if (fullMeal[ingredientKey] && fullMeal[ingredientKey].trim() !== '') {
                    ingredients.push({
                        name: fullMeal[ingredientKey],
                        measurement: fullMeal[measureKey] || 'As needed'
                    });
                }
            }

            return {
                ...fullMeal,
                ingredients,
                cookTime: '45 mins',
                servings: '4'
            };
        } catch (detailError) {
            console.error(`Error fetching meal details for ${meal.idMeal}:`, detailError);
            return null;
        }
    };

    // Fetch categories and recipes
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Fetch categories
                const categoriesResponse = await fetch(categoriesApi);
                const categoriesData = await categoriesResponse.json();
                
                if (!categoriesData.categories || !Array.isArray(categoriesData.categories)) {
                    throw new Error('Invalid categories data');
                }
                
                setCategories(categoriesData.categories);

                // Fetch recipes for first few categories to avoid overwhelming the API
                const categoriesToFetch = categoriesData.categories.slice(0, 5);
                const allRecipes = [];

                for (let category of categoriesToFetch) {
                    const categoryUrl = `${recipesApi}${encodeURIComponent(category.strCategory)}`;
                    
                    const recipesResponse = await fetch(categoryUrl);
                    const recipesData = await recipesResponse.json();
                    
                    if (!recipesData.meals || !Array.isArray(recipesData.meals)) {
                        console.warn(`No meals found for category: ${category.strCategory}`);
                        continue;
                    }

                    // Fetch full details for each recipe in the category
                    const categoryRecipes = await Promise.all(
                        recipesData.meals.slice(0, 10).map(fetchFullRecipeDetails)
                    );

                    // Filter out null results
                    const validCategoryRecipes = categoryRecipes.filter(recipe => recipe !== null);
                    allRecipes.push(...validCategoryRecipes);
                }

                setRecipes(allRecipes);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Add a new recipe
    const addRecipe = (newRecipe) => {
        // Ensure the new recipe has all required fields
        const completeRecipe = {
            ...newRecipe,
            idMeal: newRecipe.idMeal || Date.now().toString(),
            cookTime: newRecipe.cookTime || '45 mins',
            servings: newRecipe.servings || '4',
            ingredients: newRecipe.ingredients || []
        };

        setRecipes(prevRecipes => [...prevRecipes, completeRecipe]);
    };

    // Delete a recipe
    const deleteRecipe = (recipeId) => {
        setRecipes(prevRecipes => 
            prevRecipes.filter(recipe => recipe.idMeal !== recipeId)
        );
    };

    return (
        <RecipeContext.Provider value={{ 
            recipes, 
            setRecipes,
            categories, 
            addRecipe, 
            deleteRecipe,
            isLoading
        }}>
            {children}
        </RecipeContext.Provider>
    )
}