import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Platform
} from "react-native";
import React, { Component } from "react";
import { AppLoading, Asset, Font } from "expo";

import data from "../data";

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

class Home extends React.Component {
  static navigationOptions = { header: null };

  state = {
    isLoading: true,
    error: ""
  };

  _loadAssetsAsync = async () => {
    try {
      const childsImages = [
        ...data.map(item => [...item.childs.map(child => child.img)])
      ].reduce((acc, val) => acc.concat(val), []);

      // const childsAudios = [
      //   ...data.map(item => [...item.childs.map(child => child.music)])
      // ].reduce((acc, val) => acc.concat(val), []);

      const test = [
        ...data.map(item => item.img),
        ...childsImages
        // ...childsAudios
      ];
      const imageAssets = cacheImages(test);

      // const fontAssets = cacheFonts([FontAwesome.font]);

      await Promise.all([...imageAssets]);
      this.setState({ isLoading: false });
    } catch (error) {
      console.log("error", error);
      this.setState({ isLoading: false, error: JSON.stringify(error) });
    }
  };

  componentDidMount() {
    this._loadAssetsAsync();
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Nature", { childs: item.childs });
          console.disableYellowBox = true;
        }}
      >
        <ImageBackground
          style={styles.boxContainer}
          imageStyle={{ borderRadius: 15 }}
          source={item.img}
        >
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
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  render() {
    const { isLoading, error } = this.state;

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

    if (error) {
      return (
        <View>
          <Text> {error} </Text>{" "}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}
export default Home;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#131E22",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  boxContainer: {
    flex: 1,
    width: width - 70,
    height: height / 2 + 10,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    margin: 15,
    shadowOpacity: 5
  },
  textStyle: {
    bottom: 30,
    left: 5,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    shadowOpacity: 2.5
  }
});
