declare module "react-native-css-gradient" {
  import { FunctionComponent, ReactNode } from "react";
  import { ViewStyle } from "react-native";

  function createCssGradient(
    gradientComponent: ReactNode
  ): FunctionComponent<{
    gradient: string;
    children?: ReactNode;
    style?: ViewStyle;
  }>;

  export default createCssGradient;
}
