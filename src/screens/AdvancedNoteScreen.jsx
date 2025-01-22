import { View } from "react-native"
import AdvancedNote from "../components/AdvancedNote"

const AdvancedNoteScreen = () => {
    return (
        <View style={styles.container}>
            <AdvancedNote />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AdvancedNoteScreen;