import express from 'express'
import cors from 'cors'
import { router } from './routes'

export const app = express()

app.use(cors())

app.use('/api', router)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
