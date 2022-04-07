import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const AddAccent = () => {
  const [sentences, setSentences] = useState([]);
  const [raw, setRaw] = useState({ text: "Tôi là người Nhật. Cảm ơn!" });

  useEffect(() => {
    // axios.post("http://localhost:8080/annotate", data).then((res) => {
    //   console.log(res.data);
    //   setSentences(res.data);
    // });
  }, []);

  // 構文解析
  const getAnalyzedSentences = (data) => {
    axios
      .post("http://localhost:8080/api/test/annotate", data)
      .then(async function (res) {
        console.log(res.data);
        setSentences(res.data);
      });
  };

  return (
    <div className="text-gray-600 body-font relative bg-gray-100">
      <div className="container px-24 py-10 mx-auto">
        {/* 解析内容のフォーム */}
        <div className="relative mb-4 px-8 py-6 rounded-lg bg-white shadow-lg">
          <label for="message" class="leading-7 text-sm text-gray-600">
            元の文章
          </label>
          <textarea
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            placeholder="ベトナム語の文章を入力してください"
            type="text"
            value={raw.text}
            onChange={(event) => setRaw({ text: event.target.value })}
          />
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => getAnalyzedSentences(raw)}
          >
            解析
          </button>
        </div>
        {/* 解析結果 */}
        <div>
          {sentences.length
            ? sentences.map((sentence) => <li>{sentence.rawSentence}</li>)
            : ""}
        </div>
      </div>
    </div>
  );
};

export default AddAccent;
