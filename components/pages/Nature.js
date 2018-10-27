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
  Platform
} from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as data from "../../data";

class Nature extends React.Component {
  static navigationOptions = { header: null };
  renderItem = ({ item }) => {
    return (
      <ImageBackground style={styles.boxContainer} source={item.img}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.back}
        >
          <Ionicons name="ios-arrow-back-outline" size={50} color="white" />
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Session", { item })}
            style={styles.sessionBtn}
          >
            <Text
              style={[
                styles.sessionText,
                {
                  fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto"
                }
              ]}
            >
              Начать Сессию
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  render() {
    const { navigation } = this.props;
    const childs = navigation.getParam("childs");
    return (
      <View style={styles.container}>
        <FlatList
          data={childs}
          renderItem={this.renderItem}
          horizontal={true}
          pagingEnabled={true}
          keyExtractor={(item, index) => item.id}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    );
  }
}
export default Nature;

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
    fontSize: 40,
    fontWeight: "bold"
  },
  sessionText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  sessionBtn: {
    bottom: height / 5,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    width: 190,
    height: 70,
    borderRadius: 30
  },
  back: {
    top: 10,
    left: 10
  },
  firstInstruction: {
    width: width - 70,
    height: height / 2,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20
  },
  firstText: {
    alignItems: "center",
    justifyContent: "flex-start",
    color: "white",
    paddingTop: 100
  }
});
