import { Center, Text } from "@chakra-ui/layout";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DATE_FORMAT } from "../../constants";

const Clock: React.FC = () => {
  const [time, setTime] = useState(() => moment().format(DATE_FORMAT));

  const updateClock = () => {
    setTime(() => moment().format(DATE_FORMAT));
  };
  useEffect(() => {
    const intervalID = setInterval(() => updateClock(), 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Center>
      <Text fontSize="sm" fontWeight="semibold">
        {time}
      </Text>
    </Center>
  );
};
export default Clock;
