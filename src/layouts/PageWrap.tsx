import { Flex, FlexProps } from "@chakra-ui/react";
import * as React from "react";
import { Helmet } from "react-helmet";

type PageWrapProps = FlexProps & {
  title: string;
};

const PageWrap: React.FC<PageWrapProps> = ({
  children,
  title,
  bg,
  ...rest
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Flex {...rest}>{children}</Flex>
    </>
  );
};

PageWrap.defaultProps = {
  p: 4,
  flex: 1,
  height: "100%",
  flexDir: "column",
  minHeight: "100vh",
  align: "flex-start",
  justify: "flex-start",
};

export default PageWrap;
