import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Deleted = () => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem("deleted");
            const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
            setNotes(parsedNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleRestore = async (noteToRestore) => {
        try {
            const storedDeletedNotes = await AsyncStorage.getItem('deleted');
            const deletedNotes = storedDeletedNotes ? JSON.parse(storedDeletedNotes) : [];
            const updatedDeletedNotes = deletedNotes.filter(note => note.title !== noteToRestore.title);
            await AsyncStorage.setItem('deleted', JSON.stringify(updatedDeletedNotes));
    
            const storedNotes = await AsyncStorage.getItem('notes');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];
            notes.push(noteToRestore);
            await AsyncStorage.setItem('notes', JSON.stringify(notes));
    
            fetchNotes();
    
            console.log('Note restored successfully');
        } catch (error) {
            console.error('Error restoring note:', error);
        }
    };    
    
    const handleDelete = async (noteToDelete) => {
        try {
            const storedNotes = await AsyncStorage.getItem('deleted');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];
            const updatedNotes = notes.filter(note => note.title !== noteToDelete.title);
            await AsyncStorage.setItem('deleted', JSON.stringify(updatedNotes));
        
            fetchNotes();
    
            console.log('Note removed successfully from deleted notes');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleClearAll = async () => {
        await AsyncStorage.removeItem('deleted');
        fetchNotes();
    }
        
    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo-text.png')} style={styles.logoText} />
            </View>

            <ScrollView style={{width: '100%', paddingHorizontal: 30}}>

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 21}}>

                    <Text style={styles.quickText}>Deleted notes:</Text>
                    
                    <TouchableOpacity style={styles.clearBtn} onPress={handleClearAll}>
                        <Text style={styles.clearBtnText}>Clear all</Text>
                    </TouchableOpacity>

                </View>

                {
                    notes.length > 0 ? (
                        <View style={{width: '100%'}}>
                            {notes.map((note, index) => (
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
                                            onPress={() => handleRestore(note)}
                                            >
                                            <Icons type={"restore"} />
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
                            <Text style={[styles.quickText, {textAlign: 'center', fontWeight: '300', marginBottom: 20}]}>You have no deleted notes yet...</Text>
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

    image: {
        width: '100%',
        height: 153,
        borderRadius: 14,
        resizeMode: 'cover'
    },

    clearBtn: {
        paddingVertical: 9,
        paddingHorizontal: 32,
        backgroundColor: '#fff',
        borderRadius: 100,
    },

    clearBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        lineHeight: 21.8
    }

})

export default Deleted;