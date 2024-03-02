const API_ENDPOINT = "https://api.letterquest.xyz/results";

const getHighScores = async () => {
  try {
    const results = await fetch(API_ENDPOINT);
    if (!results.ok) throw Error("API Error");
    const data = await results.json();
    return {
      data,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e.message,
    };
  }
};

const saveScore = async (score, nickName) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gametime: score, nickname: nickName }),
  };

  try {
    const response = await fetch(API_ENDPOINT, postOptions);
    if (!response.ok) throw Error("Save failed.");
    return null;
  } catch (e) {
    console.log("ERROR SAVING SCORE", e.message);
    return e.message;
  }
};

export { getHighScores, saveScore };
