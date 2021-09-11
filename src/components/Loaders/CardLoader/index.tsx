import { Skeleton } from "@chakra-ui/react";
import React from "react";

type CardLoaderProps = {};

const CardLoader: React.FC<CardLoaderProps> = () => {
  return (
    <Skeleton minH={210} flex={1} cursor="pointer" m={3} isLoaded={false} />
  );
};

export default CardLoader;
