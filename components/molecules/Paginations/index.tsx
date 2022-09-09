import React from "react";
import { Alert, View,Text, TouchableHighlight  } from "react-native";
import { PaginatorStyle } from "../../../core/Styles/PaginationStyles";
export const Pagination = ({ index=0, navigation }) => {
  const redirectToStep = (i:number) => {
    switch (i) {
      case 0:
        navigation.navigate("Sign Up");
        break;
      case 1:
        navigation.navigate("Step Two");
        break;
      case 2:
        navigation.navigate("Step Three");
        break;
    }
  };
  return (
    <>
      <View
        style={{
          zIndex: 100,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#216FED",
            width: 80,
            position: "absolute",
          }}
        ></View>
        <TouchableHighlight
          style={PaginatorStyle.Paginator}
          onPress={() => redirectToStep(0)}
          activeOpacity={0.5}
          underlayColor="#fff"
        >
          <View>
            {index === 0 ? <View style={PaginatorStyle.Dot}></View> : <></>}
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={PaginatorStyle.Paginator}
          onPress={() => redirectToStep(1)}
          activeOpacity={0.5}
          underlayColor="#fff"
        >
          <View>
            {index === 1 ? <View style={PaginatorStyle.Dot}></View> : <></>}
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={PaginatorStyle.Paginator}
          onPress={() => redirectToStep(2)}
          activeOpacity={0.5}
          underlayColor="#fff"
        >
          <View>
            {index === 2 ? <View style={PaginatorStyle.Dot}></View> : <></>}
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
};
