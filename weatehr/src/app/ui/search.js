"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ onSearch }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    router.push(`/weather?city=${encodeURIComponent(query)}`);
    setQuery("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={handleChange}
      />
      <button className="subBtn" type="submit">
        Search
      </button>
    </form>
  );
}
