import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State to manage the current page number for API query
  const [query, setQuery] = useState(1);
  // State to store the fetched data from the API
  const [data, setData] = useState([]);
    // State to indicate whether the API request is in progress
  const [isLoading, setIsLoading] = useState(false);
  // Function to fetch data from the API
  const fetchApi = async () => {
    setIsLoading(true);
    try {
      const res = await axios(`https://reqres.in/api/users?page=${query}`);
      setData((prevData) => [...prevData, ...res.data.data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
 // Function to handle "FetchApi" button click
  const handleNextQuery = () => {
    setQuery((prev) => prev + 1);
    fetchApi();
  };

  return (
    <>
      <header className="header">
        <h1 className="brand">
          Create a web application using create-react-app for fetching an api
          for data
        </h1>
        <button className="btn" onClick={handleNextQuery} disabled={isLoading}>
          FetchApi
        </button>
      </header>

      <section className="dataSection">
        {data.map((item) => (
          <div key={item.id} className="data">
            <img className="img" src={item.avatar} alt="" />
            <div className="text">
              <p className="name text-md">
                {item.first_name} {item.last_name}
              </p>
              <p className="email">{item.email}</p>
            </div>
          </div>
        ))}
      </section>

      {isLoading && (
        <div className="loaderSection">
          <div className="loader">
            <div className="circle"></div>
            <div className="line-1"></div>
            <div className="line-2"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
