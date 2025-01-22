import { View } from "react-native"
import Starred from "../components/Starred"
import Menu from "../components/Menu";

const StarredScreen = () => {
    return (
        <View style={styles.container}>
            <Starred />
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

export default StarredScreen;