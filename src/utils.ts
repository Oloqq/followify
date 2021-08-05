module.exports = {
  /**
   * Split input array into smaller chunks
   * @param {any[]} arr input array
   * @param {number} size size of the chunk
   * @returns {[[]]} Array of chunks
   */
  chunkify: function(arr: any[], size: number) {
    let chunks = [];
    let chunkNum = 0;
    
    do {
      chunks.push(arr.slice(chunkNum * size, (size * (chunkNum + 1))));
      chunkNum++;
    } while (arr.length > size * chunkNum);

    return chunks;
  }
}