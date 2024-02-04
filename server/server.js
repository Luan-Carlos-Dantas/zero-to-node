import fastify from "fastify";
// import { DatabaseMemory } from "../db/databaese-memory.js";
import { DatabasePostgres } from "../db/database-postgres.js";

const server = fastify()

// const db = new DatabaseMemory()
const db = new DatabasePostgres

// GET / POST / PUT / DELETE / PATCH

server.get('/videos', async (req) =>{
  const search = req.query.search

  const videos = await db.list(search)

  return videos
})

// Request Body

server.post('/videos', async (req, rep)=>{
  const {title, description, duration} = req.body


  await db.create({
    title: title,
    description: description,
    duration: duration
  })

  console.log(db.list())
  return rep.status(201).send()
})

// Route Parameter

server.put('/videos/:id', async (req, rep)=>{
  const videoID = req.params.id
  const {title, description, duration} = req.body
  await db.update(videoID,{
    title: title,
    description: description,
    duration: duration
  })

  return rep.status(204).send()
})

server.delete('/videos/:id', async (req, rep)=>{
  const videoID = req.params.id

  await db.delete(videoID)

  return rep.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port:process.env.PORT ?? 8000
})




// import {createServer} from 'node:http'

// const server = createServer((req,res)=>{
//   res.write('salve')

//   return res.end()
// })

// server.listen(8000)
