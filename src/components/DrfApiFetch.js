import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const DrfApiFetch = () => {
  const [sentences, setSentences] = useState([]);
  const [raw, setRaw] = useState({ text: "" });
  const data = {
    text: "Hình ảnh được chia sẻ trên Twitter hôm qua cho thấy tàu hộ vệ Hetman Sahaidachny chìm và nghiêng về một phía tại âu tàu ở cảng Mykolaiv.",
  };
  useEffect(() => {
    // axios.post("http://localhost:8080/annotate", data).then((res) => {
    //   console.log(res.data);
    //   setSentences(res.data);
    // });
  }, []);

  // 構文解析
  const getAnalyzedSentences = (data) => {
    axios.post("http://localhost:8080/annotate", data).then((res) => {
      console.log(res.data);
      setSentences(res.data);
    });
  };

  return (
    <div>
      <input
        className="txt"
        type="text"
        value={raw.text}
        onChange={(event) => setRaw({ text: event.target.value })}
      />
      <br />
      <button type="button" onClick={() => getAnalyzedSentences(raw)}>
        Get Analytics
      </button>
      {/* <p>{sentences.length ? sentences[0].words[0].form : ""}</p> */}
      <ul>
        {sentences.length
          ? sentences[0].words.map((word) => (
              <li key={word.index}>
                <div style={{ color: word.posTag === "V" ? "red" : "black" }}>
                  {word.form}
                </div>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default DrfApiFetch;
