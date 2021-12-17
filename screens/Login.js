import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, COLORS, SIZES, FONTS } from '../constants';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/CustomButton';

const Login = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? '65%' : '60%',
        }}
      >
        <ImageBackground
          source={images.loginBackground}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                width: '80%',
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
              }}
            >
              Cooking a Delicious Meal Easily
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* description */}
        <Text
          style={{
            marginTop: SIZES.radius,
            width: '70%',
            color: COLORS.gray,
            ...FONTS.body3,
          }}
        >
          Discover more than 1200 food recipes in your hands and cooking it
          easily!
        </Text>

        {/* buttons */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <CustomButton
            label="Login"
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => navigation.navigate('Home')}
            containerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
          />
          <CustomButton
            label="Signup"
            colors={[]}
            onPress={() => navigation.navigate('Home')}
            containerStyle={{
              marginTop: SIZES.radius,
              paddingVertical: 18,
              borderRadius: 20,
              borderColor: COLORS.darkLime,
              borderWidth: 1,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <StatusBar barStyle="light-content" />
      {/* header */}
      {renderHeader()}

      {/* details */}
      {renderDetails()}
    </View>
  );
};

export default Login;
