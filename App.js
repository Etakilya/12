import React, { Component } from "react";

import { createStackNavigator } from "react-navigation";
import Home from "./components/Home";
import Nature from "./components/pages/Nature";
import Session from "./components/pages/session/Session";
import Music from "./Music";

const RootStack = createStackNavigator(
  {
    Home: { screen: Home },
    Nature: { screen: Nature },
    Session: { screen: Session },
    Music: { screen: Music }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default App;
