const fs = require('fs');

const full_dict = require('./words_dictionary.json');

var generateDicts = function() {
  var dictionary = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  };

  Object.keys(full_dict).forEach(word => {
    dictionary[word[0]].push(word);
  });

  fs.writeFileSync('./words.json', JSON.stringify(dictionary));
  return dictionary;
}

var dictionary = require('./words.json');

var scrabbleWords = function (word) {
  var wordArray = word.split('');
  wordArray = [...new Set(wordArray)];
  var wordDicts = {};
  var wordObj = {};

  var result = [];

  // Initialize the dictionarys per character
  // And create a word object that counts the occurance of each character
  word.split('').forEach(char => {
    wordDicts[char] = dictionary[char];
    if (char in wordObj) {
      wordObj[char] += 1;
    } else {
      wordObj[char] = 1;
    }
  })

  // Loop through each character to get its dictionary
  Object.keys(wordDicts).forEach(char => {
    var charDict = wordDicts[char];

    // Loop through each word in the dictionary
    charDict.forEach(dictWord => {
      if (dictWord.length > word.length) {
        return;
      }

      // If the word shares a character with the input check if it works
      wordArray.forEach(wordChar => {
        if (dictWord.includes(wordChar)) {
          var canBe = true;
          var possibility = dictWord;
          var possibilityObj = {};

          possibility.split('').forEach(possibilityChar => {
            if (possibilityChar in possibilityObj) {
              possibilityObj[possibilityChar] += 1;
            } else {
              possibilityObj[possibilityChar] = 1;
            }

            if (!word.includes(possibilityChar)) {
              canBe = false;
              return;
            }
            if (possibilityObj[possibilityChar] > wordObj[possibilityChar]) {
              canBe = false;
              return;
            }
          })
          if (canBe) {
            result.push(possibility)
          }
        }
      })
    })
  })
  result = [...new Set(result)];
  return result;
}

var randomTiles = function(amount) {
  var result = '';
  for (var i = 0; i < amount; i++) {
    var charCode = Math.floor(Math.random() * (90 - 65) + 65);
    result += String.fromCharCode(charCode);
  }
  return result;
}

var tiles = randomTiles(7);
console.log('Tiles: ' + tiles);
var a = scrabbleWords(tiles.toLowerCase());
console.log(a);
console.log('total solutions: ' + a.length);