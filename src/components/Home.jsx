import React, { useState } from "react";
import { View, Text,ImageBackground, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, TextInput} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [isTag, setIsTag] = useState(false);
    const [tagChosen, setTagChosen] = useState(null);

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleTag = () => {
        if(isTag) {
            setIsTag(false);
        } else {
            setIsTag(true);
        }
    };

    const handleTagSelect = (tag) => {
        setTagChosen(tag);
        setIsTag(false);

        console.log(tag)
    };

    const handleSave = async () => {
        if (!title || !note) {
            alert("Please fill in all fields before saving.");
            return;
        }

        const newNote = {
            title,
            note,
            date: getCurrentDate(),
            tag: tagChosen,
        };

        try {
            const storedNotes = await AsyncStorage.getItem("notes");
            const notesArray = storedNotes ? JSON.parse(storedNotes) : [];
            notesArray.push(newNote);

            await AsyncStorage.setItem("notes", JSON.stringify(notesArray));

            setTitle("");
            setNote("");
            setTagChosen(null);
            alert("Note saved successfully!");
        } catch (error) {
            console.error("Error saving note:", error);
            alert("Failed to save the note. Please try again.");
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo-text.png')} style={styles.logoText} />
            </View>

            <ScrollView style={{width: '100%', paddingHorizontal: 30}}>

                <Text style={styles.quickText}>Quick Note:</Text>

                <View style={styles.infoContainer}>

                    <View 
                        style={[styles.upperContainer, 
                        tagChosen === 'Urgent' && {backgroundColor: '#64c231'},
                        tagChosen === 'Ideas' && {backgroundColor: '#dfbc47'},
                        tagChosen === 'Personal' && {backgroundColor: '#477cdf'}
                        ]}>
                        <Text style={styles.upperText}>{getCurrentDate()}</Text>
                        <Text style={styles.upperTagText}>{tagChosen != null ? tagChosen : ''}</Text>
                    </View>

                    <View style={{paddingHorizontal: 35, paddingBottom: 26, paddingTop: 17, alignItems: 'flex-start', width: '100%'}}>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Title..."
                            placeholderTextColor="#767676"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.noteInput}
                            placeholder="start writing here..."
                            placeholderTextColor="#777"
                            value={note}
                            onChangeText={setNote}
                            multiline
                        />
                    </View>

                    <View style={styles.toolsContainer}>
                        <TouchableOpacity style={[styles.toolBtn, {marginRight: 15}]} onPress={handleTag}>
                            <Icons type={'tag'} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.toolBtn, !title && !note && {opacity: 0.3}]} 
                            onPress={handleSave}
                            disabled={!title && !note}
                            >
                            <Icons type={'save'} />
                        </TouchableOpacity>

                        {
                            isTag && (
                                <View style={styles.tagsContainer}>
                                    <Text style={styles.tagText}>Choose the tag:</Text>
                                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                                        <TouchableOpacity 
                                            style={[styles.tagBtn, {backgroundColor: '#64c231', marginBottom: 10}]}
                                            onPress={() => handleTagSelect('Urgent')}
                                            >
                                            <Text style={styles.tagBtnText}>Urgent</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.tagBtn, {backgroundColor: '#dfbc47'}]}
                                            onPress={() => handleTagSelect('Ideas')}
                                            >
                                            <Text style={styles.tagBtnText}>Ideas</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.tagBtn, {backgroundColor: '#477cdf'}]}
                                            onPress={() => handleTagSelect('Personal')}
                                            >
                                            <Text style={styles.tagBtnText}>Personal</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>    
                            )
                        }

                    </View>

                </View>

                <Text style={styles.quickText}>Create the advanced note:</Text>

                <TouchableOpacity style={styles.advancedBtn} onPress={() => navigation.navigate('AdvancedNoteScreen')}>
                    <View style={{width: 20, height: 20, marginRight: 10}}>
                        <Icons type={'plus'} />
                    </View>
                    <Text style={styles.advancedBtnText}>Advanced Note</Text>
                </TouchableOpacity>

                <View style={{height: 200}} />

            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#d73b34',
        paddingBottom: 30
    },

    logoContainer: {
        width: '100%',
        paddingTop: height * 0.07,
        paddingHorizontal: 100,
        alignItems: 'center',
        paddingBottom: 16,
        backgroundColor: '#c12923',
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
        marginBottom: 27,
    },

    logoText: {
        width: 181,
        height: height * 0.1,
        resizeMode: 'contain',
        alignSelf: 'center'
    },

    infoContainer: {
        width: '100%',
        minHeight: 300,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 22,
        borderColor: '#991e18',
        backgroundColor: '#fff',
        marginBottom: 40
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
        justifyContent: 'space-between',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
    },

    upperText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 24
    },

    upperTagText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 24
    },

    quickText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 21.79,
        marginBottom: 20
    },

    titleInput: {
        width: '100%',
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        lineHeight: 32.7,
        marginBottom: 12
    },

    noteInput: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#3a3a3a',
        lineHeight: 21.8
    },

    advancedBtn: {
        width: '100%',
        padding: 19,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },

    advancedBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        lineHeight: 21.8
    },

    toolsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 35,
        marginBottom: 30
    },

    toolBtn: {
        width: 62,
        height: 62,
        padding: 15,
        borderRadius: 100,
        backgroundColor: '#d13932',
    },

    tagsContainer: {
        width: 222,
        paddingHorizontal: 17,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderRadius: 13,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        position: 'absolute',
        top: 70,
        zIndex: 10
    },

    tagText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        lineHeight: 21.8,
        marginBottom: 10
    },

    tagBtn: {
        paddingVertical: 5,
        paddingHorizontal: 23,
        borderRadius: 5
    },

    tagBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 19,
    }

})

export default Home;