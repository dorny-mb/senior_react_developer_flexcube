import {
  Center,
  Heading,
  Skeleton,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { calcTimestamp } from "../../utils";
import Card from "../Card";

type WeatherCardProps = {
  isLoaded?: boolean;
  item: any;
  isCurrent: boolean;
  setCurrent: React.Dispatch<React.SetStateAction<any>>;
};

const WeatherCard = React.forwardRef<HTMLDivElement, WeatherCardProps>(
  ({ isLoaded, isCurrent, item, setCurrent }, ref): JSX.Element => {
    const dayname = new Date(calcTimestamp(item?.dt)).toLocaleDateString("en", {
      weekday: "long",
    });
    const icon = item?.weather[0]?.icon;
    const temp = item?.temp?.day
      ? item?.temp?.day.toFixed(0)
      : item?.temp?.toFixed(0);

    const themeColor = useColorModeValue("white", "gray.700");

    return (
      <Skeleton
        flex={1}
        ref={ref}
        cursor="pointer"
        minH={200}
        m={3}
        isLoaded={isLoaded}
        transition="all .2s ease-in-out 0s"
        transform={isCurrent ? "scale(1.1)" : undefined}
        onClick={() => setCurrent(item)}
      >
        <Card p={2} shouldAnimate bg={themeColor}>
          <Center flexDir="column">
            <Heading as="h4" fontWeight="semibold" size="sm">
              {dayname}
            </Heading>
            <Image src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <Text fontSize="2xl" fontWeight="bold">
              {temp} <sup style={{ fontSize: ".9rem" }}>°C</sup>
            </Text>
            <Text mt={2} fontSize="sm">
              {item?.weather[0]?.description}
            </Text>
          </Center>
        </Card>
      </Skeleton>
    );
  }
);

WeatherCard.defaultProps = {
  isLoaded: true,
};

export default memo(WeatherCard);
