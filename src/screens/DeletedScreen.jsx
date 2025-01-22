import { View } from "react-native"
import Deleted from "../components/Deleted"
import Menu from "../components/Menu";

const DeletedScreen = () => {
    return (
        <View style={styles.container}>
            <Deleted />
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

export default DeletedScreen;