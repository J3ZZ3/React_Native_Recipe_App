import { useState } from 'react'

type RecipeType = {
    idMeal: string,
    strMeal: string,
    strCategory: string,
    strArea: string,
    strInstructions: string,
    strMealThumb: string,
    ingredients?: Array<{name: string, measurement: string}>,
    cookTime?: string,
    servings?: string
}

type RecipeResponse = {
    categories?: Array<{
        idCategory: string,
        strCategory: string,
        strCategoryThumb: string,
        strCategoryDescription: string
    }>,
    meals?: RecipeType[]
}

const useFetch = () => {
    const [state, setState] = useState<any[]>([]);
    const getFetch = async(link: string, options: RequestInit = {}) => {
       try {
        const result = await fetch(link, options)
        const data: RecipeResponse = await result.json()

        let processedData: any[] = [];

        // Process categories
        if (data.categories) {
            processedData = data.categories;
        }

        // Process meals/recipes
        if (data.meals) {
            processedData = data.meals.map(meal => {
                const ingredients: Array<{name: string, measurement: string}> = [];
                
                for (let i = 1; i <= 20; i++) {
                    const ingredientKey = `strIngredient${i}` as keyof RecipeType;
                    const measureKey = `strMeasure${i}` as keyof RecipeType;
                    
                    if (meal[ingredientKey] && meal[measureKey]) {
                        ingredients.push({
                            name: meal[ingredientKey] as string,
                            measurement: meal[measureKey] as string
                        });
                    }
                }

                return {
                    ...meal,
                    ingredients,
                    cookTime: '45 mins',
                    servings: '4'
                };
            });
        }

        setState(processedData);
        return processedData;
    }  catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
    }
    return [state, getFetch] as const
}

export default useFetch