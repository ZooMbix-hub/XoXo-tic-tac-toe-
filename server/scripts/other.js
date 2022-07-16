module.exports.calculateWinners = function (squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] !== null && squares[b] !== null && squares[c] !== null) {
        if (squares[a].role && squares[a].role === squares[b].role && squares[a].role === squares[c].role) {
          return [squares[a], [a, b, c]];
        }
      }
    }
    return null;
}

module.exports.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.isEmptyObj = function (object) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
}