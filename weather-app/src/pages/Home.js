import { Text, Select, Skeleton, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState(null);
  const getCities = async () => {
    const url = "https://appsmx.com.mx/api/test/ciudad.php";
    setIsLoading(true);
    await axios
      .get(url, {})
      .then((resp) => {
        if (resp.data.isSuccess) {
          setCities(resp.data.data);
          setIsError(false);
          setCity(resp.data.data[0]);
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
    getCities();
  }, []);

  const onChange = ({ target }) => {
    const { value } = target;
    setCity(value);
  };

  return (
    <>
      <Text fontSize="4xl" fontWeight="bold" textAlign="center">
        El clima en tu ciudad
      </Text>

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
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Por el momento el servicio no se encuentra disponible, inténtalo
              de nuevo más tarde.
            </Text>
          ) : (
            <>
              {cities.length !== 0 && (
                <>
                  <Text fontSize="lg">Selecciona una ciudad</Text>

                  <Select
                    onChange={onChange}
                    defaultValue={cities[0]}
                    name="city"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>

                  <>{city !== "" && <WeatherCard city={city} />}</>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
