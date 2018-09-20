import mongoose from 'mongoose'

export default async () => {
  const { host, port, database, username, password } = config.db
  const auth = username && password ? `${username}:${password}@` : ''
  let link = `mongodb://${auth}${host}:${port}/${database}`
  if (process.env.NODE_ENV === 'production' && process.env.MONGO_URL) {
    link = process.env.MONGO_URL
  }
  console.log(link)
  mongoose
    .connect(link, { useMongoClient: true })
    .then(db => {
      console.log('Connect to MongoDB success')
    })
    .catch(err => {
      throw err
    })
}
