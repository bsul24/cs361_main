"use client";
import SearchBar from "../ui/search";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [formatDate, setFormatDate] = useState("");
  const [formatTime, setFormatTime] = useState("");
  const [tempUnit, setTempUnit] = useState("F");
  const [searchOn, setSearchOn] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchWeatherData = async () => {
      const city = searchParams.get("city");
      if (city) {
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
          );
          const data = await res.json();
          setWeatherData(data);
          setDatetime(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };

    fetchWeatherData();
  }, [searchParams.get("city")]);

  const setDatetime = (data) => {
    const datetime = new Date(data.location.localtime);
    const datetimeOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formatTimeOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    setFormatDate(datetime.toLocaleDateString(undefined, datetimeOptions));
    setFormatTime(datetime.toLocaleTimeString(undefined, formatTimeOptions));
  };

  const handleSearch = (query) => {
    document.querySelector("input").value = "";
    setSearchOn(false);
  };

  const handleUnitBtnClick = (e) => {
    if (e.target.classList.contains("fahr")) {
      setTempUnit("F");
      e.target.classList.add("selected");
      document.querySelector(".cel").classList.remove("selected");
    } else {
      setTempUnit("C");
      e.target.classList.add("selected");
      document.querySelector(".fahr").classList.remove("selected");
    }
  };

  const handleSearchEnable = () => {
    setSearchOn(true);
  };

  return (
    <main>
      <Link className="homeBtn link" href="/">
        Home
      </Link>
      <div className="weatherContainer">
        {weatherData ? (
          <>
            <h1>{weatherData.location.name}</h1>
            <h2>{weatherData.current.condition.text}</h2>
            <img src={weatherData.current.condition.icon} alt="" />
            <p>
              {formatDate} {formatTime}
            </p>
            <p className="temp">
              {tempUnit === "F"
                ? weatherData.current.temp_f
                : weatherData.current.temp_c}{" "}
              {tempUnit === "F" ? "°F" : "°C"}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className="unitBtnContainer">
          <button
            onClick={handleUnitBtnClick}
            className="unitBtn fahr selected"
          >
            F
          </button>
          <button onClick={handleUnitBtnClick} className="unitBtn cel">
            C
          </button>
        </div>
      </div>
      {searchOn ? (
        <div className="searchContainer">
          <SearchBar onSearch={handleSearch} />
        </div>
      ) : (
        <div className="searchContainer">
          <button className="subBtn" onClick={handleSearchEnable}>
            Enable Search
          </button>
        </div>
      )}
    </main>
  );
}
