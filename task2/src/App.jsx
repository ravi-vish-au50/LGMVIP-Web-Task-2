// import React, { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [users, setUser] = useState([]);
//   const loadUsers = async () => {
//     console.log("before");
//     const response = await fetch("http://api.github.com/users");
//     const jsonrersponse = await response.json();
//     setUser(jsonrersponse);
//   };
//   return (
//     <>
//       <div className="App">
//         <h1>Hello all</h1>
//         <button onClick={loadUsers}>Get Data</button>
//         <h2>Users:</h2>
//         <ul>
//           {users.map(({ id, login, avatar_url }) => (
//             <li key={id}>
//               Name : {login}, Avatar: {avatar_url}{" "}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default App;




import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApi = async () => {
    setIsLoading(true);
    const res = await axios(`https://reqres.in/api/users?page=${query}`);

    setData((prevData) => {
      return [...prevData, ...res.data.data];
    });
    setIsLoading(false);
  };

  const handleNextQuery = () => {
    setQuery((prev) => prev + 1);
    fetchApi();
  };

  return (
    <>
      <header className="header w-full">
        <nav className="nav">
          <h1 className="brand">Sasta Api</h1>
          {query === 3 ? (
            <>
              <a href="/" className="btn">
                Api Limit Reached Reset
              </a>
            </>
          ) : (
            <>
              <button className="btn" onClick={handleNextQuery}>
                FetchApi
              </button>
            </>
          )}
        </nav>
      </header>

      {data.length === 0 && (
        <section className="loaderSection">
          <p className="para">
            This is the same loader that will show when you click on the
            fetchapi,<br />I have usedd it to show on the home screen just so we can see it
          </p>
          <div className="loader">
            <div className="circle"></div>
            <div className="line-1"></div>
            <div className="line-2"></div>
          </div>
        </section>
      )}

      {isLoading ? (
        <>
          <section className="loaderSection">
            <div className="loader">
              <div className="circle"></div>
              <div className="line-1"></div>
              <div className="line-2"></div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="dataSection">
            {data &&
              data.map((item, index) => (
                <div key={index} className="data">
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
        </>
      )}
    </>
  );
}

export default App;
