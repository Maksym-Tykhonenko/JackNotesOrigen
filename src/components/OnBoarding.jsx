import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const OnBoarding = () => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);


    const handleButtonPress = () => {
        setComponentIndex((prevIndex) => (prevIndex + 1) % 3);

        if(componentIndex === 2) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <View style={styles.container}>

            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Image source={require('../assets/logo-text.png')} style={styles.logoText} />

            <View style={styles.infoContainer}>

                <View style={styles.upperContainer}>
                    <Text style={styles.upperText}>Today</Text>
                    <Text style={styles.upperText}>{componentIndex + 1}/3</Text>
                </View>

                <View style={{paddingHorizontal: 35, paddingBottom: 26, paddingTop: 17, alignItems: 'flex-start', width: '100%'}}>
                    {
                        componentIndex === 0 && 
                        <Text style={styles.title}>Organize Your Ideas Effortlessly!</Text>
                    }
                    {
                        componentIndex === 1 && 
                        <Text style={styles.title}>Use Tags!</Text>
                    }
                    {
                        componentIndex === 2 && 
                        <Text style={styles.title}>Save What Matters!</Text>
                    }

                    {
                        componentIndex === 0 && 
                        <Text style={styles.text}>Each note is saved as a sticker — a vibrant card with a title and text preview.</Text>
                    }
                    {
                        componentIndex === 1 && 
                        <Text style={styles.text}>Add colorful tags to your stickers for quick access. Red is your primary accent.</Text>
                    }
                    {
                        componentIndex === 2 && 
                        <Text style={styles.text}>Star important stickers to keep them in your Favorites for easy reference.</Text>
                    }

                    <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                        <Text style={styles.btnText}>{componentIndex != 2 ? 'Next' : 'Start'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: height * 0.15,
        padding: 30,
        backgroundColor: '#d73b34'
    },
    logo: {
        width: 203,
        height: height * 0.082,
        resizeMode: 'contain',
        marginBottom: 15
    },
    logoText: {
        width: 311,
        height: height * 0.17,
        resizeMode: 'contain',
        marginBottom: 43
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 22,
        borderColor: '#991e18',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    upperContainer: {
        width: '100%',
        paddingHorizontal: 26,
        paddingVertical: 11,
        backgroundColor: '#d67070',
        borderBottomWidth: 1,
        borderBottomColor: '#991e18',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    upperText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 24
    },
    title: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        lineHeight: 32.68,
        textAlign: 'left',
    },
    text: {
        fontWeight: '400',
        fontSize: 16,
        color: '#777',
        textAlign: 'left',
        marginBottom: 17,
        lineHeight: 21.8
    },
    btn: {
        paddingVertical: 14,
        paddingHorizontal: 67,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#d13932',
    },
    btnText: {
        fontWeight: '700',
        fontSize: 17,
        color: '#fff',
    },
})

export default OnBoarding;