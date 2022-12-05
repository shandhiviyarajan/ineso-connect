import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import SelectBox from "../../../atoms/SelectBox";
import { SystemColors } from "../../../../core/Styles/theme/colors";
import { category_command } from "../../../../core/utils/Categories";

function LightDimming({ category }) {
  const [slide, setSlide] = React.useState(50);
  const handleSelect = (e) => {
    console.log(e);
  };

  const onValueChange = (e) => {
    console.log(e);
    setSlide(parseInt(e));
  };

  const is_command = category_command.filter((cc) => cc.name === category)[0];

  const commands = ["Turn on", "Turn off", "Dimming light"];

  return (
    <>
      <View>
        {is_command.commands.dimming && (
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6,
            }}
          >
            Dimming {JSON.stringify(is_command)}
          </Text>
        )}
        <SelectBox
          defaultValue="Turn on"
          placeholder="Command"
          onSelect={(e) => {
            handleSelect(e);
          }}
          data={
            is_command.commands.dimming ? commands : ["Turn on", "Turn off"]
          }
        />
        {is_command.commands.dimming && (
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: "90%", marginRight: 6 }}>
              <Slider
                value={slide}
                onValueChange={onValueChange}
                style={{ width: "100%", height: 44 }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={SystemColors.primary}
                maximumTrackTintColor="#F2F5F9"
              />
            </View>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{slide}%</Text>
          </View>
        )}
      </View>
    </>
  );
}

export default LightDimming;
