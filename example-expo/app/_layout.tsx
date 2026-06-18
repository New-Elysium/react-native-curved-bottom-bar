import React from 'react';
import { CurvedBottomBarExpo } from '@psync/curved-bottom-bar';
import { useNavigation } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CircleButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.circleButton} onPress={onPress}>
      <Text style={styles.circleButtonText}>+</Text>
    </TouchableOpacity>
  );
}

function TabBar({
  routeName,
  selectedTab,
  navigate,
}: {
  routeName: string;
  selectedTab: string;
  navigate: (name: string) => void;
}) {
  return (
    <TouchableOpacity style={styles.tabBar} onPress={() => navigate(routeName)}>
      <Text
        style={[
          styles.tabBarText,
          selectedTab === routeName && styles.tabBarTextActive,
        ]}
      >
        {routeName}
      </Text>
    </TouchableOpacity>
  );
}

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Home Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Settings Screen</Text>
    </View>
  );
}

function MessagesScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Messages Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Profile Screen</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <CurvedBottomBarExpo.Navigator
      type="down"
      height={55}
      circleWidth={50}
      bgColor="white"
      borderTopLeftRight
      initialRouteName="home"
      renderCircle={(props) => <CircleButton {...props} />}
      tabBar={(props) => <TabBar {...props} />}
    >
      <CurvedBottomBarExpo.Screen
        name="home"
        component={HomeScreen}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="messages"
        component={MessagesScreen}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="center"
        component={() => null}
        position="CIRCLE"
      />
      <CurvedBottomBarExpo.Screen
        name="settings"
        component={SettingsScreen}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name="profile"
        component={ProfileScreen}
        position="RIGHT"
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  screenText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  circleButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circleButtonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '300',
  },
  tabBar: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'gray',
  },
  tabBarTextActive: {
    color: '#007AFF',
    fontWeight: '700',
  },
});
