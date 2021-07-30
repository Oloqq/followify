module.exports = {
  /**
   * Split input array into smaller chunks
   * @param {*[]} arr input array
   * @param {number} size size of the chunk
   * @returns {[[]]} Array of chunks
   */
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