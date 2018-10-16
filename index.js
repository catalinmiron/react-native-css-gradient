import React from "react";
import generateGradient from "./generator";

export default ({ gradient, children, style }) => {
  let ExpoGradient, OriginalGradient;
  try {
    ExpoGradient = require("expo").LinearGradient;
    OriginalGradient = require("react-antive-linear-gradient");
  } catch (err) {
    // noop
  }

  const LinearGradient = ExpoGradient ? ExpoGradient : OriginalGradient;
  const generated = generateGradient(gradient, {
    width: style.width,
    height: style.height
  });
  if (generated.length > 1) {
    return (
      <View style={[style, { position: "relative" }]}>
        {generated.map((obj, i) => (
          <LinearGradient style={[StyleSheet.absoluteFill]} {...obj} key={i} />
        ))}
        {children || null}
      </View>
    );
  }
  return (
    <LinearGradient style={style} {...generated[0]}>
      {children || null}
    </LinearGradient>
  );
};
