import { Flex, Container, useMediaQuery } from "@chakra-ui/react";
import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import moment from "moment";

import { filterOptions } from "../../data/index";
import { useFetch } from "../../hooks";
import { OPEN_WEATHER_MAP_API_KEY, REFETCH_DELAY_TIME } from "../../constants";
import { CardLoader, EmptyHandler, MatrixBoard, Nav } from "../../components";
import { PageWrapper } from "./styles";
const WeatherCard = React.lazy(
  () => import("../../components/WeatherCard/index")
);

type ParamsType = {
  APPID: string;
  q?: string;
  lat?: number;
  lon?: number;
  units?: string;
  exclude?: string;
};

const Home: React.FC = () => {
  const [filter, setFilter] = useState("0");
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setFilter(e.target.value);

  const params = useMemo(
    (): ParamsType => ({
      APPID: OPEN_WEATHER_MAP_API_KEY,
      units: "metric",
      lon: filterOptions[parseFloat(filter)].Longitude,
      lat: filterOptions[parseFloat(filter)].Latitude,
      exclude: "minutely,alerts,hourly",
    }),
    [filter]
  );

  const { data: res, state: forecastState } = useFetch<ParamsType>(
    "https://api.openweathermap.org/data/2.5/onecall",
    "GET",
    params,
    REFETCH_DELAY_TIME
  );
  const { data: dataForMatrix, state } = useFetch<ParamsType>(
    "https://api.openweathermap.org/data/2.5/forecast",
    "GET",
    params,
    REFETCH_DELAY_TIME
  );
  const forecastLoading = forecastState === "loading";
  const maxtrixLoading = state === "loading";
  const error = forecastState === "network-error" || state === "network-error";

  const [current, setCurrent] = useState<any>();
  const forecast = res as any;
  const data = dataForMatrix as any;

  const [chartOptions, setChartOptions] = useState(() => ({
    options: {
      chart: {
        id: "",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  }));

  const currentMatrix = useMemo(
    () => data?.list?.filter((i: any) => i?.dt >= current?.dt)?.slice(0, 8),
    [current, data]
  );

  useEffect(() => {
    if (current) return;
    setCurrent(() => (forecast ? forecast.daily[0] : null));
  }, [forecast, current]);

  useEffect(() => {
    if (currentMatrix)
      setChartOptions({
        options: {
          chart: {
            id: "Time",
          },
          xaxis: {
            categories: currentMatrix?.map((matrix: any) =>
              moment(matrix?.dt_txt).format("hh:mm a")
            ),
          },
        },
        series: [
          {
            name: "Degree Celsius",
            data: currentMatrix?.map((matrix: any) =>
              parseInt(matrix?.main?.temp)
            ),
          },
        ],
      });
  }, [forecast, currentMatrix]);

  const [isTabletOrMobile] = useMediaQuery("(max-width: 40em)");

  if (error) return <EmptyHandler subTitle={state} />;
  return (
    <PageWrapper title="Home">
      <Container maxW="container.lg">
        <Nav
          filter={filter}
          handleFilterChange={handleFilterChange}
          isLoaded={!forecastLoading}
        />

        <Flex my={8} minH={200} flexDir={isTabletOrMobile ? "column" : "row"}>
          {forecast?.daily?.slice(0, 5)?.map((item: any, idx: number) => (
            <Suspense key={idx} fallback={<CardLoader />}>
              <WeatherCard
                isLoaded={!forecastLoading}
                item={item}
                isCurrent={item?.dt === current?.dt}
                setCurrent={setCurrent}
              />
            </Suspense>
          ))}
        </Flex>
        <MatrixBoard
          isLoaded={!maxtrixLoading}
          options={chartOptions.options}
          series={chartOptions.series}
        />
      </Container>
    </PageWrapper>
  );
};

export default Home;
