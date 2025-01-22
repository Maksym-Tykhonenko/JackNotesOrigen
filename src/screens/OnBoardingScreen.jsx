import { View } from "react-native"
import OnBoarding from "../components/OnBoarding"

const OnBoardingScreen = () => {
    return (
        <View style={styles.container}>
            <OnBoarding />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default OnBoardingScreen;