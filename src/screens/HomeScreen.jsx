import { View } from "react-native"
import Home from "../components/Home"
import Menu from "../components/Menu";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Home />
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

export default HomeScreen;