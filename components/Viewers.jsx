import React from 'react';
import { View, Text, Image } from 'react-native';

import { FONTS, COLORS } from '../constants';

const Viewers = ({ viewersList }) => {
  if (viewersList?.length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          Be the first one to try this
        </Text>
      </View>
    );
  } else if (viewersList?.length <= 4) {
    return (
      <View>
        {/* profile */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          {viewersList?.map((i, idx) => (
            <View
              key={idx}
              style={{
                height: 50,
                width: 50,
                marginLeft: idx === 0 ? 0 : -20,
              }}
            >
              <Image
                source={i.profilePic}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
            </View>
          ))}
        </View>

        {/* text */}
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          {viewersList?.length} people
        </Text>
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          Already tried this!
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        {/* profile */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          {viewersList?.map((i, idx) => {
            if (idx <= 2) {
              return (
                <View
                  key={idx}
                  style={{
                    height: 50,
                    width: 50,
                    marginLeft: idx === 0 ? 0 : -20,
                  }}
                >
                  <Image
                    source={i.profilePic}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                </View>
              );
            }

            if (idx === 3) {
              return (
                <View
                  key={idx}
                  style={{
                    height: 50,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: -20,
                    borderRadius: 25,
                    backgroundColor: COLORS.darkGreen,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                    }}
                  >
                    {viewersList?.length - 3}+
                  </Text>
                </View>
              );
            }
          })}
        </View>

        {/* text */}
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          {viewersList?.length} people
        </Text>
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          Already tried this!
        </Text>
      </View>
    );
  }
};

export default Viewers;
