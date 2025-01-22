import { View } from "react-native"
import Swipe from "../components/Swipe"
import Menu from "../components/Menu";

const SwipeScreen = () => {
    return (
        <View style={styles.container}>
            <Swipe />
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

export default SwipeScreen;