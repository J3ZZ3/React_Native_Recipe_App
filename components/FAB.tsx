import React from 'react'
import { Link } from 'expo-router'
import { View, Pressable, Image } from 'react-native'

type Props = {}

const FAB = (props: Props) => {
  return (
    <Link asChild href="/(" >
        <Pressable style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#808080',
            position: 'absolute',
            bottom: 40,
            right: 30
        }}>
<Image source={require('../assets/plus.png')}
style={{width: 30, height: 30}}
resizeMode='contain' />
        </Pressable>
    </Link>
  )
}

export default FAB