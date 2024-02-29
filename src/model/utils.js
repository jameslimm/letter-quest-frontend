import questionBank from "./questions.json";

export const chooseQuestions = (totalQuestions, maxWordLength = 4) => {
  const _qB = questionBank.filter((q) => q.word.length < maxWordLength);
  _qB.sort((a, b) => (Math.random() < 0.5 ? -1 : 1));
  _qB.splice(0, _qB.length - totalQuestions);

  _qB.forEach((_q) => {
    const wordArr = _q.word.split("");
    const letterIdx = Math.floor(Math.random() * wordArr.length);

    _q.answer = wordArr[letterIdx];
    wordArr[letterIdx] = "_";
    _q.question = wordArr.join("");
  });
  return _qB;
};
