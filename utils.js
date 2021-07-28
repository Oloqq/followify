module.exports = {
  chunkify: function(arr, size) {
    chunks = [];
    chunkNum = 0;
    
    do {
      chunks.push(arr.slice(chunkNum * size, (size * (chunkNum + 1))));
      chunkNum++;
    } while (arr.length > size * chunkNum);

    return chunks;
  }
}