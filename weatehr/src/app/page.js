"use client";
import SearchBar from "./ui/search";

export default function Home() {
  const handleSearch = (query) => {
    console.log(`Searching for: ${query}`);
  };
  return (
    <main>
      {/* <div className="loginContainer">
        <button className="homeBtn">Sign Up</button>
        <button className="homeBtn">Login</button>
        <h2 className="loginText">
          Login to save favorite locations! (We will never contact the email you
          use to sign up with.){" "}
        </h2>
      </div> */}
      <p className="welcomeText">
        This app is designed to help keep you informed about weather conditions
        so that you can plan your day accordingly. Take advantage of features
        such as current weather, weather forecasts, and saved locations!
      </p>
      <div className="searchContainer">
        <SearchBar onSearch={handleSearch} />
      </div>
      <p className="searchInfo">
        To get started, enter a city or zip code in the text box and press
        enter. You will then be shown current weather and weather forecasts for
        that location!
      </p>
    </main>
  );
}
