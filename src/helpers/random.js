/**
 * @description Generate a ramdom code
 * @param {MongoId} type (1 is number, another is string)
 * @param {MongoId} length 
 * @returns {String|Number}
 */
const random = async (type, length) => {
  var chars =
    type === 1 ? "1234567890" : "qwertyuiopasdfghjklzxcvbnm1234567890";
  var code = "";
  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length);
    code += chars.charAt(i);
  }
  return code;
};
export default random;
