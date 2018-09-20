let mongoose = require('mongoose')
let Schema = mongoose.Schema

let RevokedTokenScheme = new Schema({
  token: String,
  date: { type: Date, default: Date.now }
})
export default mongoose.model('RevokedToken', RevokedTokenScheme)
