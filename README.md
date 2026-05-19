![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar-demo.png)

# react-native-curved-bottom-bar
A high performance, beautiful and fully customizable curved bottom navigation bar for React Native.
Implemented using [react-native-svg](https://github.com/react-native-svg/react-native-svg) and [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator).

```js
If you love this library, give us a star, you will be a ray of sunshine in our lives :)
```

### Free React Native Boilerplate
[React Native Template](https://github.com/hoaphantn7604/react-native-template-components) with a beautiful UI.
## Getting started
```js
npm install react-native-curved-bottom-bar --save
```
or
```js
yarn add react-native-curved-bottom-bar
```
Now we need to install the required peer dependencies:

```js
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-svg
```
or
```js
yarn add @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-svg
```

> **React Navigation v7** — `@react-navigation/bottom-tabs` v7 requires `@react-navigation/native`, `react-native-screens ≥ 4`, and `react-native-safe-area-context ≥ 4`. Follow the [React Navigation getting started guide](https://reactnavigation.org/docs/getting-started) for additional native setup steps.

## Demo

[<img src="https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bat-thumbnail.jpg">](https://youtu.be/FIuhT2QYie8)


<br />

![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar.gif)


### CurvedBottomBar.Navigator

| Props              | Params                                                          | isRequire | Description                                                                         |
|--------------------|-----------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------|
| initialRouteName   | String                                                          | Yes       | The name of the route to render on first load of the navigator                      |
| renderCircle       | ({ routeName, selectedTab, navigate }) => React.ReactElement    | Yes       | Function that returns a React element to display as the center tab item             |
| type               | 'DOWN' or 'UP'                                                  | No        | Type of the center tab item, downward curve or upward curve. Default: `'DOWN'`      |
| circlePosition     | 'CENTER' or 'LEFT' or 'RIGHT'                                   | No        | Position of circle button. Default: `'CENTER'`                                      |
| tabBar             | ({ routeName, selectedTab, navigate }) => React.ReactElement    | No        | Function that returns a React element to display as a tab bar icon                  |
| circleWidth        | Number                                                          | No        | Customize width of the center tab item. Minimum is 50px and Maximum is 60px         |
| style              | ViewStyle                                                       | No        | Styling for container view                                                          |
| shadowStyle        | ViewStyle                                                       | No        | Styling for shadow view. Not supported in Expo — use `CurvedBottomBarExpo` instead  |
| width              | Number                                                          | No        | Customize width for container view                                                  |
| height             | Number                                                          | No        | Customize height for container view. Minimum is 50px and Maximum is 90px            |
| borderTopLeftRight | Boolean                                                         | No        | Border radius top left and top right of container view                              |
| borderColor        | String                                                          | No        | Border color                                                                        |
| borderWidth        | Number                                                          | No        | Border width                                                                        |
| bgColor            | String                                                          | No        | Background color of container view                                                  |
| id                 | String                                                          | No        | Optional navigator ID (React Navigation v7)                                         |
| screenOptions      | BottomTabNavigationOptions or function                          | No        | Default options for all screens (React Navigation v7)                               |
| backBehavior       | 'firstRoute' \| 'initialRoute' \| 'order' \| 'history' \| 'none' | No      | Behaviour of back button (React Navigation v7). Default: `'firstRoute'`             |
| enableGlassEffect  | Boolean                                                         | No        | Opt-in to Apple's Liquid Glass material on iOS 26+. See "Liquid Glass" below.       |
| glassEffectStyle   | 'regular' \| 'clear'                                            | No        | Liquid Glass material variant. Default: `'regular'`                                 |


### CurvedBottomBar.Screen

| Props     | Params                                      | isRequire | Description                                                                                                                                                |
|-----------|---------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name      | String                                      | Yes       | Name of the route                                                                                                                                          |
| position  | 'LEFT' or 'RIGHT' or 'CIRCLE' or 'CENTER'   | Yes       | Position of the tab icon. Use `'CIRCLE'` or `'CENTER'` when the circle button should itself be a navigable tab view                                        |
| component | React.ComponentType                         | Yes       | Component to render for this screen                                                                                                                        |
| options   | BottomTabNavigationOptions                  | No        | Screen-level navigation options                                                                                                                            |

### API
| Function           | Params                        | Description                                                                               |
| ------------------ | ----------------------------- | ----------------------------------------------------------------------------------------- |
| setVisible         | Boolean                       | Used to hide/show the tab bar. Ex: ref.current.setVisible(false)                          |

### Use in Expo
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar-1.png)
```js
import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function App() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'ios-home-outline';
        break;
      case 'title2':
        icon = 'settings-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Click Action')}
            >
              <Ionicons name={'apps-sharp'} color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="title1"
          position="LEFT"
          component={() => <Screen1 />}
        />
        <CurvedBottomBarExpo.Screen
          name="title2"
          component={() => <Screen2 />}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});

```

### Use in RN CLI
![](https://github.com/hoaphantn7604/file-upload/blob/master/document/navigationbar/react-native-curved-bottom-bar-2.png)
```js
import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function App() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'ios-home-outline';
        break;
      case 'title2':
        icon = 'settings-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <CurvedBottomBar.Navigator
        type="UP"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Click Action')}
            >
              <Ionicons name={'apps-sharp'} color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen
          name="title1"
          position="LEFT"
          component={() => <Screen1 />}
        />
        <CurvedBottomBar.Screen
          name="title2"
          component={() => <Screen2 />}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});

```
<br />

## Use with expo-router

This package ships an optional entry point for [`expo-router`](https://docs.expo.dev/router/introduction/).
`expo-router` is not a hard dependency — it is loaded dynamically and only
required if you import the entry below.

```tsx
// app/(tabs)/_layout.tsx
import { CurvedTabs } from 'react-native-curved-bottom-bar/expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <CurvedTabs
      initialRouteName="home"
      type="DOWN"
      bgColor="white"
      height={60}
      circleWidth={50}
      renderCircle={({ navigate }) => (
        <TouchableOpacity onPress={() => navigate('camera')}>
          <Ionicons name="apps-sharp" size={25} color="gray" />
        </TouchableOpacity>
      )}
      tabBar={({ routeName, selectedTab, navigate }) => (
        <TouchableOpacity onPress={() => navigate(routeName)}>
          <Ionicons
            name={routeName === 'home' ? 'home-outline' : 'settings-outline'}
            size={25}
            color={routeName === selectedTab ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      )}
    >
      <CurvedTabs.Screen name="home" position="LEFT" />
      <CurvedTabs.Screen name="camera" position="CIRCLE" />
      <CurvedTabs.Screen name="settings" position="RIGHT" />
    </CurvedTabs>
  );
}
```

## Liquid Glass (iOS 26+)

Apple introduced the **Liquid Glass** material in iOS 26. Pass
`enableGlassEffect` on the navigator to opt in. The library uses the optional
peer dependency [`expo-glass-effect`](https://docs.expo.dev/versions/latest/sdk/glass-effect/)
to render the material; on Android, on iOS < 26, or when `expo-glass-effect`
is not installed the prop is a no-op and the bar renders normally.

```sh
npx expo install expo-glass-effect
```

```tsx
<CurvedBottomBarExpo.Navigator
  enableGlassEffect
  glassEffectStyle="regular"   // or 'clear'
  bgColor="transparent"        // important: do not occlude the glass material
  // ...other props
/>
```

[<img src="https://github.com/hoaphantn7604/file-upload/blob/master/document/profile/hoa_phan_dev_banner.png">](https://github.com/hoaphantn7604)
