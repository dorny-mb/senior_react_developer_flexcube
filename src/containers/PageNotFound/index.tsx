import {
  Button,
  Container,
  Image,
  Text,
  Heading,
  Flex,
  Center,
  Icon,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { FiCornerDownLeft } from "react-icons/fi";
import { RouteComponentProps } from "react-router-dom";
import { PageWrap } from "../../layouts";
import { images } from "../../theme";

const PageNotFound: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <PageWrap
      title="404"
      justify="center"
      align="center"
      height="100vh"
      width="100vw"
      bgColor="white"
    >
      <Container maxW="container.xl">
        <Flex>
          <Center flex={1}>
            <Image w="100%" src={images[404]} />
          </Center>
          <Flex flex={1} flexDir="column" justify="space-around">
            <Stack>
              <Heading as="h2" mb={3} size="4xl">
                Oops
              </Heading>
              <Heading as="h3" size="xl">
                we couldn&apos;t find that page.
              </Heading>
            </Stack>
            <Stack>
              <Text my={4} fontSize="xl">
                Maybe you can find what you need here.
              </Text>
              <Flex align="center">
                <Button size="sm" onClick={() => history.push("/")}>
                  <Text fontWeight="lighter">Back Home</Text>
                </Button>
                <Icon mx={5} as={FiCornerDownLeft} />
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </PageWrap>
  );
};

export default PageNotFound;
