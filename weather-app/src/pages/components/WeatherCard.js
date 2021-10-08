import { Flex, Text, Switch, Stack, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const toFarenheit = (degrees) => (1.8 * degrees + 32).toFixed(2);

const WeatherCard = ({ city }) => {
  const [unit, setUnit] = useState(false);
  const [cityWeather, setCityWeather] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCityWeather = async () => {
    const url = `https://appsmx.com.mx/api/test/temperatura.php/${city}`;

    setIsLoading(true);
    await axios
      .get(url, {})
      .then((resp) => {
        if (resp.data.isSuccess) {
          setCityWeather(resp.data.data);
          setIsError(false);
        } else {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getCityWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <>
      {isLoading ? (
        <Stack>
          <Skeleton height="20px"></Skeleton>
          <Skeleton height="20px"></Skeleton>
          <Skeleton height="20px"></Skeleton>
          <Skeleton height="20px"></Skeleton>
        </Stack>
      ) : (
        <>
          {isError ? (
            <>
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Por el momento el servicio no se encuentra disponible, inténtalo
                de nuevo más tarde.
              </Text>
            </>
          ) : (
            <>
              {cityWeather && (
                <>
                  <Flex height="350px" width="500px">
                    <Stack width="60%" spacing={3} textAlign="center">
                      <Text fontWeight="bold" fontSize="2xl">
                        {city}
                      </Text>
                      <Text fontSize="6xl">{`${
                        unit ? toFarenheit(cityWeather) : cityWeather
                      }º ${unit ? "F" : "C"}`}</Text>

                      <i
                        className={`fas fa-temperature-${
                          cityWeather > 27 ? "high" : "low"
                        } fa-9x`}
                        style={{
                          color: cityWeather > 27 ? "#f59942" : "#4287f5",
                        }}
                      ></i>
                    </Stack>
                    <Stack
                      width="40%"
                      display="flex"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Text fontSize="xl">{`Ver como ${
                        unit ? "Celsius" : "Farenheit"
                      }`}</Text>
                      <Switch
                        size="lg"
                        value={unit}
                        defaultValue={unit}
                        isChecked={unit}
                        onChange={() => setUnit(!unit)}
                      ></Switch>
                    </Stack>
                  </Flex>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default WeatherCard;
