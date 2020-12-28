import {StyleSheet} from 'react-native'
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeText: {
      alignSelf: "center",
      fontSize: 70,
    }
  })

  export default styles