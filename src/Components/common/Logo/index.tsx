import React from "react";
import logo from "../../../logo.png";
import { LogoProps, SIZES } from "./type";

const SizeMap = {
  large: 64,
  medium: 32,
  small: 16,
};

const defaultSize = SIZES.MEDIUM;

function Logo({ size = defaultSize }: LogoProps) {
  const logoStyles = {
    width: SizeMap[size],
    height: SizeMap[size],
  };

  return <img src={logo} style={logoStyles} />;
}

export default Logo;
