import React from 'react'
import { View, Pressable, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

type RecipeType = {
    idMeal: string,
    strMeal: string,
    strMealThumb: string,
    strCategory: string
}

type RecipeProps = {
    deleteRecipe?: (value: string) => void,
    item: RecipeType
}

const RecipeCard: React.FC<RecipeProps> = ({deleteRecipe, item}) => {
  return (
        <View style={styles.container}>
        <Image style={styles.Image} source={{uri: item.strMealThumb}}/>
        <View style={styles.textContainer}>
            <Text style={styles.mealName}>{item.strMeal}</Text>
            <Text style={styles.category}>{item.strCategory}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Link asChild href={{pathname: "/(public)/[id]", params: {id: item.idMeal}}}>
            <Pressable style={{...styles.button, ...styles.viewButton}}>
                <Text> View Recipe </Text>
            </Pressable>
            </Link>
            {deleteRecipe && (
                <Pressable onPress={() => deleteRecipe(item.idMeal)} style={{...styles.button, ...styles.deleteButton}} >
                    <Text>Delete</Text>
                </Pressable>
            )}
        </View>
        </View>
  )
}

export default RecipeCard;

const styles = StyleSheet.create({
    container: {
        width: (Dimensions.get('window').width - 60) / 2,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#000000',
        overflow: 'hidden',
        justifyContent: 'space-between'
    },
    Image: {
        height: '100%'
    },
    textContainer:{
        paddingHorizontal: 20
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 20,
        position: 'absolute',
        bottom: 0
    },
    button:{
        borderRadius: 20,
        padding: 10,
    },
    viewButton: {
        backgroundColor: '#BDBDBD'
    },
    deleteButton: {
        backgroundColor: '#FF3131'
    },
    mealName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    category: {
        fontSize: 14,
        color: '#FFFFFF'
    }
})