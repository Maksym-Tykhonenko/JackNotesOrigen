import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Share} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Starred = () => {
    const navigation = useNavigation();
    const [isTag, setIsTag] = useState(false);
    const [tagChosen, setTagChosen] = useState('All');
    const [starredNotes, setStarredNotes] = useState([]);    

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

    const fetchStarredNotes = async () => {
        try {
            const storedStarNotes = await AsyncStorage.getItem('starNotes');
            const parsedStarNotes = storedStarNotes ? JSON.parse(storedStarNotes) : [];
            setStarredNotes(parsedStarNotes);
        } catch (error) {
            console.error('Error fetching starred notes:', error);
        }
    };

    useEffect(() => {
        fetchStarredNotes();
    }, []);

    const filteredNotes = tagChosen === "All" ? starredNotes : starredNotes.filter((note) => note.tag === tagChosen);

    const handleShare = async (note) => {
        try {
            const shareContent = `Title: ${note.title}\nNote: ${note.note}\nTag: ${note.tag}\nDate: ${note.date}`;
    
            await Share.share({
                message: shareContent,
                url: note.image ? note.image : undefined,
            });
        } catch (error) {
            console.error("Error sharing note:", error);
        }
    };

    const handleStar = async (noteToStar) => {
        try {
            const storedStarNotes = await AsyncStorage.getItem('starNotes');
            const starNotes = storedStarNotes ? JSON.parse(storedStarNotes) : [];
    
            const isAlreadyStarred = starNotes.some(note => note.title === noteToStar.title);
    
            if (isAlreadyStarred) {
                const updatedStarNotes = starNotes.filter(note => note.title !== noteToStar.title);
                await AsyncStorage.setItem('starNotes', JSON.stringify(updatedStarNotes));
                console.log('Note unstarred successfully');
            } else {
                starNotes.push(noteToStar);
                await AsyncStorage.setItem('starNotes', JSON.stringify(starNotes));
                console.log('Note starred successfully');
            }
    
            fetchStarredNotes();
        } catch (error) {
            console.error('Error starring note:', error);
        }
    };
    
    const handleDelete = async (noteToDelete) => {
        try {
            const storedNotes = await AsyncStorage.getItem('notes');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];
            const updatedNotes = notes.filter(note => note.title !== noteToDelete.title);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    
            const storedStarNotes = await AsyncStorage.getItem('starNotes');
            const starNotes = storedStarNotes ? JSON.parse(storedStarNotes) : [];
            const updatedStarNotes = starNotes.filter(note => note.title !== noteToDelete.title);
            await AsyncStorage.setItem('starNotes', JSON.stringify(updatedStarNotes));

            const storedDeletedNotes = await AsyncStorage.getItem('deleted');
            const deletedNotes = storedDeletedNotes ? JSON.parse(storedDeletedNotes) : [];
            deletedNotes.push(noteToDelete);
            await AsyncStorage.setItem('deleted', JSON.stringify(deletedNotes));
    
            fetchNotes();
            fetchStarredNotes();
    
            console.log('Note deleted successfully from both notes and starred notes');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
        
    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo-text.png')} style={styles.logoText} />
            </View>

            <ScrollView style={{width: '100%', paddingHorizontal: 30}}>

                <View style={{width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 21}}>

                <Text style={styles.quickText}>My notes:</Text>
                <View>
                    <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={handleTag}>
                        <Text style={styles.quickText}>{tagChosen}</Text>
                        <View style={{width: 18, height: 9, marginLeft: 5}}>
                            <Icons type={'arrow'} />
                        </View>
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
                                    <TouchableOpacity 
                                        style={[styles.tagBtn, {backgroundColor: '#d13932', marginBottom: 10}]}
                                        onPress={() => handleTagSelect('All')}
                                        >
                                        <Text style={styles.tagBtnText}>All</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>    
                        )
                    }
                </View>

                </View>

                {
                    filteredNotes.length > 0 ? (
                        <View style={{width: '100%'}}>
                            {filteredNotes.map((note, index) => (
                                <View key={index} style={styles.infoContainer}>
                                    <View 
                                        style={[styles.upperContainer, 
                                        note.tag === "Urgent" && { backgroundColor: "#64c231" },
                                        note.tag === "Ideas" && { backgroundColor: "#dfbc47" },
                                        note.tag === "Personal" && { backgroundColor: "#477cdf" }
                                        ]}
                                    >
                                        <Text style={styles.upperText}>{note.date}</Text>
                                        <Text style={styles.upperTagText}>{note.tag}</Text>
                                    </View>

                                    <View style={{ paddingHorizontal: 35, paddingBottom: 26, paddingTop: 17, alignItems: "flex-start", width: "100%" }}>
                                        <Text style={styles.noteTitle}>{note.title}</Text>
                                        <Text style={styles.note}>{note.note}</Text>
                                        {
                                            note.image && (
                                                <Image source={{uri: note.image}} style={styles.image} />
                                            )
                                        }
                                    </View>

                                    <View style={styles.toolsContainer}>
                                        <TouchableOpacity 
                                            style={[styles.toolBtn, { marginRight: 15 }]}
                                            onPress={() => handleShare(note)}
                                            >
                                            <Icons type={"share"} />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.toolBtn, { marginRight: 15, backgroundColor: starredNotes.some(starNote => starNote.title === note.title) ? '#fca030' : '#d13932' }]}
                                            onPress={() => handleStar(note)}
                                            >
                                            <Icons type={"star"} />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.toolBtn}
                                            onPress={() => handleDelete(note)}
                                            >
                                            <Icons type={"trash"} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                            <Text style={[styles.quickText, {textAlign: 'center', fontWeight: '300', marginBottom: 20}]}>You haven`t added any notes with selected tag yet...</Text>
                            <TouchableOpacity style={styles.noBtn} onPress={() => navigation.navigate('HomeScreen')}>
                                <Text style={styles.noBtnText}>Add notes</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

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
    },

    noteTitle: {
        width: '100%',
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        lineHeight: 32.7,
        marginBottom: 12
    },

    note: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#3a3a3a',
        lineHeight: 21.8,
        marginBottom: 12
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
        top: 25,
        right: -20,
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
    },

    image: {
        width: '100%',
        height: 153,
        borderRadius: 14,
        resizeMode: 'cover'
    },

    noBtn: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 50,
        backgroundColor: '#991e18',
        borderWidth: 1,
        borderColor: '#fff'
    },

    noBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 19,
    }

})

export default Starred;