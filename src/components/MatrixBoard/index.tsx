import { Skeleton, useColorModeValue } from "@chakra-ui/react";
import React, { memo, useLayoutEffect, useRef, useState } from "react";
import Card from "../Card";

import Chart from "react-apexcharts";
import { useWindowDimensions } from "../../hooks";

type MatrixBoardProps = {
  isLoaded?: boolean;
  options: ApexCharts.ApexOptions | undefined;
  series?: any[] | undefined;
  width?: number | string;
  height?: number | string;
};

const MatrixBoard = React.forwardRef<Chart, MatrixBoardProps>(
  ({ isLoaded, options, series, width, height }, ref) => {
    const { width: windowWidth } = useWindowDimensions();

    const [containerDimentions, setContainerDimentions] = useState<
      number | undefined
    >();
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      setContainerDimentions(containerRef?.current?.clientWidth);
    }, [windowWidth]);
    const themeColor = useColorModeValue("white", "rgba(255,255,255,0.9)");
    return (
      <Skeleton isLoaded={isLoaded} ref={containerRef}>
        <Card shouldAnimate bg={themeColor}>
          <Chart
            ref={ref}
            options={options}
            series={series}
            type="line"
            width={width ? width : containerDimentions}
            height={height}
          />
        </Card>
      </Skeleton>
    );
  }
);

MatrixBoard.defaultProps = {
  isLoaded: true,
  height: 300,
};

export default memo(MatrixBoard);
