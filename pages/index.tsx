import React, { useState, useEffect } from "react";
import PhotoListComponent from "../components/PhotoListComponent";

const App = () => {
  const [text, setText] = useState("");
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then(setPhotoList);
  }, []);

  return (
    <div style={{ margin: "32px", textAlign: "center" }}>
      <div>
        <label htmlFor="text">[text]</label>
        <input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <PhotoListComponent text={text} photoList={photoList} />
      </div>
    </div>
  );
};

export default App;
