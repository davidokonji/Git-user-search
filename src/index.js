import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "./config";
import hub from "./hub.png";

import "./styles.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    image: "",
    name: "",
    bio: "",
    url: "",
    public_repos: "",
    searched: false
  });

  const handleChange = e => {
    setUsername(e.target.value);
  };
  const handleFetch = async () => {
    const res = await axios.get(`/users/${username}`);
    console.log(res.data);
    setUser({
      image: res.data.avatar_url,
      name: res.data.name,
      bio: res.data.bio,
      url: res.data.html_url,
      public_repos: res.data.public_repos,
      searched: true
    });
  };
  return (
    <div className="App">
      <p>
        <img
          src={hub}
          style={{
            width: "7rem"
          }}
          alt="avi"
        />
      </p>
      <p>search for github usernames</p>
      <input
        type="text"
        placeholder="enter username"
        value={username}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleFetch}>
        Search User
      </button>
      {user.searched && (
        <div className="card">
          <div className="card-image">
            <img
              src={user.image || ""}
              alt="user"
              style={{ objectFit: "contain" }}
              className="image"
            />
          </div>
          <div className="card-body">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p>{`${user.name} has ${user.public_repos} repos currently`}</p>
            <a href={user.url} target="__blank">
              View profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
