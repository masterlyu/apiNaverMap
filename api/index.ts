const express = require("express"); //express서버 구축
const axios = require("axios"); //axios package사용 --웹사이트 자체에서 서버에 호출을 보냈을때 결과값을 알려주는 패키지
const app = express(); //express사용해서 현재 앱을 활성화

app.get("/", (req, res) => res.send("Express on Vercel"));  //홈페이지에 Express on Vercel 문구 인쇄

app.get("/get-directions", async (req, res) => {  // get-directions경로를 호출하면 되돌려 주는 값을 지정
  const { start, goal, option } = req.query;

  console.log("Query parameters:", { start, goal, option }); //현재 터미널에 잘 실행되고 있는 확인하는 코드

  const url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving";
  const headers = {
    "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
  };

  console.log("Request URL:", url);  // 확인코드
  console.log("Request headers:", headers);  //확인코드

  try {
    const response = await axios.get(url, {
      params: { start, goal, option },
      headers: headers,
    });

    console.log("Response status:", response.status);
    console.log("Response data: ", response.data);
    // console.log("Response data:", JSON.stringify(response.data, null, 2));

    res.status(200).json(response.data);  //GPT가 받는 답변코드
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : null,
    });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 0; // This will choose a random available port
  const server = app.listen(PORT, () =>
    console.log(`Server ready on port ${server.address().port}.`)
  );
}

module.exports = app;