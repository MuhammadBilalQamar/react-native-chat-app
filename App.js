import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Main from './Main';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reducer from './redux/reducers/reducer';
import thunk from "redux-thunk";
// import crashlytics from '@react-native-firebase/crashlytics';

const middlewares = [thunk];
const store = createStore(reducer, applyMiddleware(...middlewares));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Text >Fonts are loading</Text>;
    }
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <Main />
        {/* <Button title="Test Crash" onPress={() => crashlytics().crash()} /> */}

      </Provider>

    );
  }
}