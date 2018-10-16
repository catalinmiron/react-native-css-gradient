import React, { Component } from 'react';
import { Text, ScrollView, View, Dimensions, StatusBar} from 'react-native';
import gradients from './gradient-source';
import Gradient from 'react-native-css-gradient';

const {width, height }= Dimensions.get('window');

export default class App extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render() {
    return (
        <ScrollView>
          {gradients.map((g, key) => {
            return <Gradient
                key={key}
                gradient={g.gradient}
                style={{
                  width,
                  height,
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  padding: 20,
                  marginBottom: 4
                }}
              >
                <View>
                  <Text style={{fontSize: 46, fontWeight: "100", opacity: .8}}>{g.title}</Text>
                  <Text style={{fontFamily: "Courier New", fontSize: 11, fontWeight: "500"}}>{g.gradient}</Text>
                </View>
              </Gradient>
          })}
        </ScrollView>

   );
  }
}