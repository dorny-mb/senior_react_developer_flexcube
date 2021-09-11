import {
  Skeleton,
  Select,
  Flex,
  Center,
  Heading,
  useMediaQuery,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Clock } from "..";
import { filterOptions } from "../../data";

type NavProps = {
  isLoaded: boolean;
  filter: string;
  handleFilterChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const Nav: React.FC<NavProps> = ({ isLoaded, filter, handleFilterChange }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isTabletOrMobile] = useMediaQuery("(max-width: 40em)");
  return (
    <Flex justify="space-between" my={5}>
      <Center
        width={isTabletOrMobile ? "100%" : "auto"}
        justifyContent="space-between"
      >
        <Heading as="h1" mr={4} fontSize="2xl">
          flexclub
        </Heading>
        <Skeleton isLoaded={isLoaded}>
          <Select
            size="sm"
            maxW="280px"
            value={filter}
            onChange={handleFilterChange}
            variant="filled"
          >
            {filterOptions.map((option, idx) => (
              <option key={option.id} value={`${idx}`}>
                {option.title}
              </option>
            ))}
          </Select>
        </Skeleton>
      </Center>

      <Center>
        {!isTabletOrMobile && (
          <Skeleton isLoaded={isLoaded}>
            <Clock />
          </Skeleton>
        )}
        <IconButton
          onClick={toggleColorMode}
          size="sm"
          mx={4}
          aria-label="Change Theme"
          icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
        />
      </Center>
    </Flex>
  );
};
Nav.defaultProps = {
  isLoaded: true,
};
export default Nav;
