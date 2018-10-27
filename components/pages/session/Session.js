import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
  ActivityIndicator
} from "react-native";
import React, { Component } from "react";
import { EvilIcons, Entypo, Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

const anime = [
  {
    com: 0,
    img: require("../../../images/meditation.png"),
    text:
      "Выпрямите спину и одновременно расслабьте тело ,сядьте в удобную для вас позицию.Спина - прямая и вертикальная , а все остальное тело должно быть мягким"
  },
  {
    com: 1,
    img: require("../../../images/lotus.png"),
    text:
      "Сделайте 2-3 медленных вдоха и выдоха , затем дышите как обычно. Направьте ваше внимание на дыхание , если внимание ушло в след за мыслями , просто возвращайте его к дыханию"
  },
  {
    com: 2,
    img: require("../../../images/wave.png"),
    text: "Теперь закройте глаза, вслушайтесь в звуки и расслабьтесь"
  }
];

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      seconds: 0,
      currentIndex: 0,
      isLoading: true
    };

    this.soundObject = new Expo.Audio.Sound();
  }

  async componentDidMount() {
    try {
      const item = this.props.navigation.getParam("item");

      await this.soundObject.loadAsync(item.music);
      this.setState({ isLoading: false });
    } catch (error) {}
  }

  playSound = async () => {
    try {
      this.setState({ isStarted: true });
      this.id = setInterval(this.tick, 1000);

      await this.soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      console.log("startError", error);
      // An error occurred!
    }
  };

  tick = () => {
    if (this.state.seconds % 20 === 0 && this.state.seconds > 0) {
      let index = this.state.seconds / 20;
      if (index >= anime.length) {
        index = 0;
      }
      // const currentText = anime[index - 1].text;

      this.setState({ currentIndex: index });
    }

    this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
  };

  stopSound = async () => {
    try {
      this.setState({ isStarted: false });
      clearInterval(this.id);
      await this.soundObject.pauseAsync();
    } catch (error) {
      console.log("error", error);
    }
  };

  close = async () => {
    try {
      this.setState({ isStarted: false });
      clearInterval(this.id);
      await this.soundObject.stopAsync();
    } catch (error) {
      console.log("error", error);
    }
    this.props.navigation.navigate("Nature");
  };

  static navigationOptions = { header: null };
  renderItem = item => {
    const { isStarted } = this.state;
    return (
      <ImageBackground style={styles.boxContainer} source={item.img}>
        <TouchableOpacity onPress={this.close} style={styles.back}>
          <EvilIcons name="close" size={50} color="white" />
        </TouchableOpacity>
        <View style={styles.centerStyle}>
          <Text
            style={[
              styles.textStyle,
              {
                fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto"
              }
            ]}
          >
            {item.name}
          </Text>

          {!isStarted ? (
            <TouchableOpacity
              onPress={this.playSound}
              style={styles.sessionBtn}
            >
              <Feather name="play-circle" size={90} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.stopSound}
              style={styles.sessionBtn}
            >
              <Feather name="pause-circle" size={90} color="white" />
            </TouchableOpacity>
          )}

          <View style={styles.firstInstruction}>
            <Image
              style={styles.InstrIcon}
              source={anime[this.state.currentIndex].img}
            />
            <Text
              style={[
                styles.firstText,
                {
                  fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto"
                }
              ]}
            >
              {anime[this.state.currentIndex].text}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };
  render() {
    const { navigation } = this.props;
    const { isLoading } = this.state;

    const item = navigation.getParam("item");

    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#131E22"
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return <View style={styles.container}>{this.renderItem(item)}</View>;
  }
}
export default Session;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#131E22",
    flex: 1
  },
  boxContainer: {
    flex: 1,
    width: width,
    height: height
  },
  centerStyle: {
    alignItems: "center",
    width: width,
    height: height
  },
  textStyle: {
    color: "white",
    marginTop: height / 30,
    fontSize: 30,
    fontWeight: "bold"
  },
  sessionText: {
    fontSize: 20,
    color: "white"
  },
  sessionBtn: {
    bottom: height / 6,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",

    width: 100,
    height: 100,
    borderRadius: 100
  },
  backBtn: {
    position: "absolute",
    left: 10,
    top: 10
  },
  firstInstruction: {
    width: width - 70,
    height: height / 2,

    borderColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  firstText: {
    color: "white",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
    fontWeight: "bold"
  },
  timeStyle: {
    color: "white",
    width: 100,
    height: 50
  },
  back: {
    top: 10,
    left: 10
  },
  InstrIcon: {
    alignSelf: "center",
    width: 70,
    height: 70,
    marginTop: 5
  }
});
