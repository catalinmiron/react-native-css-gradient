import React from "react";
import { View, StyleSheet } from "react-native";
import generateGradient from "./generator";

export { generateGradient };

const createCssGradient = (GradientComponent) => ({
  gradient,
  children,
  style,
}) => {
  const generated = generateGradient(gradient, {
    width: style.width,
    height: style.height,
  });

  if (generated.length > 1) {
    return (
      <View style={[style, { position: "relative" }]}>
        {generated.map((obj, i) => (
          <GradientComponent
            style={[StyleSheet.absoluteFill]}
            {...obj}
            key={i}
          />
        ))}
        {children}
      </View>
    );
  }

  return (
    <GradientComponent style={style} {...generated[0]}>
      {children}
    </GradientComponent>
  );
};

export default createCssGradient;
