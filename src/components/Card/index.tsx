import { FlexProps, useColorModeValue } from "@chakra-ui/react";
import { MotionProps, Variants } from "framer-motion";
import React from "react";
import { theme } from "../../theme";
import MotionFlex from "../MotionFlex";

export type CardProps = FlexProps &
  MotionProps & {
    shouldAnimate?: boolean;
  };

const Card = React.forwardRef<HTMLElement | SVGElement, CardProps>(
  ({ children, shouldAnimate, borderColor, border, ...rest }, ref) => {
    const variants: Variants = {
      show: {
        y: 0,
        opacity: 1,
      },
      hide: {
        y: 50,
        opacity: 0,
      },
    };
    const borderThemeColor = useColorModeValue("gray.100", "gray.800");

    return (
      <MotionFlex
        ref={ref}
        animate="show"
        initial="hide"
        variants={shouldAnimate ? variants : {}}
        border={border ? border : "1px solid"}
        borderColor={borderThemeColor}
        {...rest}
      >
        {children}
      </MotionFlex>
    );
  }
);

Card.defaultProps = {
  width: "auto",
  rounded: "md",
  bg: theme.transparency,
  backdropFilter: "blur(5px)",
  onClick: () => false,
  flexDirection: "column",
};

export default Card;
