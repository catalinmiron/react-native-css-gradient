# CSS Gradient for LinearGradient

### Installation

with yarn
```sh
yarn add react-native-css-gradient
```

or with npm

```sh
npm install --save react-native-css-gradient
```

### Usage

```js
import createCssGradient from "react-native-css-gradient";
import LinearGradient from "react-native-linear-gradient";
// or from expo:
// import { LinearGradient } from "expo-linear-gradient";

const Gradient = createCssGradient(LinearGradient);

render() {
    const gradient = `linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%),
                      repeating-linear-gradient(-115deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px),
                      repeating-linear-gradient(115deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`;

    return <Gradient gradient={gradient} style={yourStyle}>
}
```

### Props

| Prop     | Details                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| gradient | CSS Gradient (linear and repeating) are working for the moment                                                |
| style    | default styles (**Note, if you're going to use repeating gradient you have to specify the width and height**) |
| children | -                                                                                                             |

CSS background image for React-Native using `LinearGradient` from [Expo](https://expo.io).
Supported backgrounds:

- [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)
- [repeating-linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient)

![image](https://github.com/catalinmiron/react-native-css-gradient/raw/master/screenshots/gif.gif)
<br/>
<img src="https://github.com/catalinmiron/react-native-css-gradient/raw/master/screenshots/grad1.png" width="400">
<br/>
<img src="https://github.com/catalinmiron/react-native-css-gradient/raw/master/screenshots/grad2.png" width="400">
<br/>
<img src="https://github.com/catalinmiron/react-native-css-gradient/raw/master/screenshots/grad3.png" width="400">
<br/>
<img src="https://github.com/catalinmiron/react-native-css-gradient/raw/master/screenshots/grad4.png" width="400">
<br/>
<img src="https://github.com/catalinmiron/react-native-css-gradient/raw/master/screenshots/grad5.png" width="400">
<br/>
<img src="https://github.com/catalinmiron/react-native-css-gradient/raw/master/screenshots/grad6.png" width="400">

### About

If you have questions please don't hesitate to contact me on [Twitter](http://twitter.com/mironcatalin).
