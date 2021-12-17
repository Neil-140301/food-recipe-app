import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

import { BlurView } from 'expo-blur';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import Viewers from '../components/Viewers';

const Header_Height = 350;

const RecipeCreatorCardDetails = ({ recipe }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {/* profile photo */}
      <View
        style={{
          width: 40,
          height: 40,
          marginLeft: 20,
        }}
      >
        <Image
          source={recipe?.author?.profilePic}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
      </View>

      {/* labels */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          Recipe By
        </Text>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {recipe?.author?.name}
        </Text>
      </View>

      {/* button */}
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.lightGreen1,
        }}
      >
        <Image
          source={icons.rightArrow}
          style={{
            width: 15,
            height: 15,
            tintColor: COLORS.lightGreen1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const RecipeCreatorCardInfo = ({ recipe }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
        }}
        tint="dark"
      >
        <RecipeCreatorCardDetails recipe={recipe} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.transparentBlack9,
        }}
      >
        <RecipeCreatorCardDetails recipe={recipe} />
      </View>
    );
  }
};

const Recipe = ({ navigation, route }) => {
  const [recipe, setRecipe] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let { recipe } = route.params;
    setRecipe(recipe);
  }, [route]);

  const renderRecipeCardHeader = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          overflow: 'hidden',
          marginTop: -1000,
          paddingTop: 1000,
        }}
      >
        <Animated.Image
          source={recipe?.image}
          resizeMode="contain"
          style={{
            height: Header_Height,
            width: '200%',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-Header_Height, 0, Header_Height],
                  outputRange: [-Header_Height / 2, 0, Header_Height * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-Header_Height, 0, Header_Height],
                  outputRange: [2, 1, 0.5],
                }),
              },
            ],
          }}
        />

        {/* recipe creator card */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 30,
            right: 30,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo recipe={recipe} />
        </Animated.View>
      </View>
    );
  };

  const renderHeaderBar = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        {/* screen overlay */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [Header_Height - 100, Header_Height - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        {/* header bar title */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [Header_Height - 100, Header_Height - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [Header_Height - 100, Header_Height - 50],
                  outputRange: [50, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <Text
            style={{
              color: COLORS.lightGray2,
              ...FONTS.body4,
            }}
          >
            Recipe By
          </Text>
          <Text
            style={{
              color: COLORS.white2,
              ...FONTS.h3,
            }}
          >
            {recipe?.author?.name}
          </Text>
        </Animated.View>

        {/* back */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.lightGray,
            }}
          />
        </TouchableOpacity>

        {/* bookmark */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
          }}
        >
          <Image
            source={recipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.darkGreen,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecipeInfo = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 130,
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 20,
          alignItems: 'center',
        }}
      >
        {/* recipe */}
        <View
          style={{
            flex: 1.5,
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...FONTS.h2 }}>{recipe?.name}</Text>
          <Text
            style={{
              marginTop: 5,
              color: COLORS.lightGray2,
              ...FONTS.body4,
            }}
          >
            {recipe?.duration} | {recipe?.serving} Serving
          </Text>
        </View>

        {/* viewers */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Viewers viewersList={recipe?.viewers} />
        </View>
      </View>
    );
  };

  const renderIngredientHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 30,
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
        }}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS.h3,
          }}
        >
          Ingredients
        </Text>

        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          {recipe?.ingredients?.length} items
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={recipe?.ingredients}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* header */}
            {renderRecipeCardHeader()}

            {/* info */}
            {renderRecipeInfo()}

            {/* ingredients title */}
            {renderIngredientHeader()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 30,
                marginVertical: 5,
              }}
            >
              {/* icon */}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  width: 50,
                  borderRadius: 5,
                  backgroundColor: COLORS.lightGray,
                }}
              >
                <Image
                  source={item.icon}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
              </View>

              {/* desc */}
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {item.description}
                </Text>
              </View>

              {/* quantity */}
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {item.quantity}
                </Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 100,
            }}
          />
        }
      />

      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
