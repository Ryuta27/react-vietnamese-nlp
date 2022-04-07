import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const Analyze = () => {
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
      .post("http://localhost:8080/api/test/annotate", data, {
        headers: authHeader(),
      })
      .then(async function (res) {
        console.log(res.data);
        const new_res = await Promise.all(
          res.data.map(async function (sentence) {
            const japaneseSentence = await translateToJapanese(
              sentence.rawSentence
            );
            return { ...sentence, japaneseSentence };
          })
        );
        console.log(new_res);
        setSentences(new_res);
      });
  };

  // 日本語翻訳
  const translateToJapanese = (data) => {
    const headers = {
      "Ocp-Apim-Subscription-Key": "******",
      "Ocp-Apim-Subscription-Region": "eastus",
      "Content-Type": "application/json",
    };
    return axios
      .post(
        "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=ja&from=vi",
        [
          {
            Text: data,
          },
        ],
        { headers: headers }
      )
      .then((res) => res.data[0].translations[0].text);
  };

  const normalStyle =
    "border-solid border-2 rounded border-gray-300 mb-2 px-1 mx-1"; // デフォルトのclass
  const vStyle = `${normalStyle} bg-green-200`; // デフォルトのclassと追加したいclass
  const nStyle = `${normalStyle} bg-purple-200`;
  const npStyle = `${normalStyle} bg-purple-200`;
  const aStyle = `${normalStyle} bg-pink-200`;
  const mStyle = `${normalStyle} bg-yellow-200`;
  const chStyle = `${normalStyle} bg-gray-200`;

  const eStyle = `${normalStyle} bg-orange-200`;
  const ccStyle = `${normalStyle} bg-orange-200`;
  const rStyle = `${normalStyle} bg-orange-200`;
  const pStyle = `${normalStyle} bg-orange-200`;
  const cStyle = `${normalStyle} bg-orange-200`;
  const lStyle = `${normalStyle} bg-orange-200`;

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
            ? sentences.map((sentence) => (
                <div className="rounded-lg p-3 mb-3 bg-white shadow-lg">
                  <ul className="flex flex-wrap">
                    {sentence.words.map((word) => (
                      <li
                        className={
                          (() => {
                            if (word.posTag === "V") {
                              return vStyle;
                            } else if (word.posTag === "N") {
                              return nStyle;
                            } else if (word.posTag === "Np") {
                              return npStyle;
                            } else if (word.posTag === "A") {
                              return aStyle;
                            } else if (word.posTag === "M") {
                              return mStyle;
                            } else if (word.posTag === "CH") {
                              return chStyle;
                            } else if (word.posTag === "E") {
                              return eStyle;
                            } else if (word.posTag === "Cc") {
                              return ccStyle;
                            } else if (word.posTag === "R") {
                              return rStyle;
                            } else if (word.posTag === "P") {
                              return pStyle;
                            } else if (word.posTag === "C") {
                              return cStyle;
                            } else if (word.posTag === "L") {
                              return lStyle;
                            } else {
                              return normalStyle;
                            }
                          })()
                          // word.posTag === "V" ? activeStyle : normalStyle
                        }
                        key={word.index}
                      >
                        <div

                        // style={{ color: word.posTag === "V" ? "red" : "black" }}
                        >
                          {word.form.replace("_", " ")}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* 日本語訳がここに入る */}
                  <p className="text-2xl mx-1">{sentence.japaneseSentence}</p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Analyze;
