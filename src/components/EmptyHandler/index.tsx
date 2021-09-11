import { Image, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { RevealFlex } from "..";
import { images } from "../../theme";
import Card from "../Card";

type EmptyListHandlerProps = {
  title?: string;
  subTitle?: string;
};

const EmptyListHandler: React.FC<EmptyListHandlerProps> = ({
  title,
  subTitle,
}) => {
  const theme = useColorModeValue("white", "gray.700");
  return (
    <Card
      p={4}
      flex={1}
      minH="85vh"
      width="100%"
      bg={theme}
      align="center"
      maxWidth="100%"
      justify="center"
      flexDirection="column"
      shouldAnimate
      border="none"
    >
      <RevealFlex>
        <Image
          src={images.noData}
          width="300px"
          maxWidth="100%"
          height="auto"
        />
        <Heading as="h2" textAlign="center" my={3} fontWeight="bold">
          {title}
        </Heading>
        <Text fontSize="2xl" as="h4" textAlign="center">
          {subTitle}
        </Text>
      </RevealFlex>
    </Card>
  );
};

export default EmptyListHandler;

EmptyListHandler.defaultProps = {
  title: "Nothing to see here, yet.",
  subTitle: "Try again later",
};
