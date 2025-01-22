import { View } from "react-native"
import Notes from "../components/Notes"
import Menu from "../components/Menu";

const NotesScreen = () => {
    return (
        <View style={styles.container}>
            <Notes />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0
    }
}

export default NotesScreen;