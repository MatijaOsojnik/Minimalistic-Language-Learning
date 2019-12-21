module.exports = randomNum;

function randomNum(phraseData) {
      let randomNum = 0;
      let newNumber;
  newNumber = Math.floor(Math.random() * Object.keys(phraseData.german).length);
  while (newNumber === randomNum) {
    newNumber = Math.floor(
      Math.random() * Object.keys(phraseData.german).length
    );
  }
  randomNum = newNumber;

  return newNumber;
};
