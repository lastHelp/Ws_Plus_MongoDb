function randomTextCreate(maxLength) {
    let  res = '';
    const min = 1034;
    const max = 1113;
    while(res.length!==maxLength) {
    const randomCharCode = Math.round((Math.random()*(max-min))+min)
    res += (Math.random()<0.9) ? String.fromCharCode(randomCharCode) : " ";
  }
  return res;
  }

  module.exports = randomTextCreate;