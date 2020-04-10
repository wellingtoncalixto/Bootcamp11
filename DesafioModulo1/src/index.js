const express = require('express')
const {uuid, isUuid} = require('uuidv4')

const api = express();

api.use(express.json());

const repositories = [];


function logRequest(request, response, next) {
  const {method, url} = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.log(logLabel)
  return next()
}

function isValaidId(request, response, next) {
  const {id} = request.params

  if(!isUuid(id)) {
    return response.status(400).json({error: "Id invalid"})
  }

  return next();
}

api.use('/repositorie/:id', isValaidId)


api.get('/repositories', (request, response) => {
  return response.json(repositories);
})

api.post('/repositories', (request, response) => {
  const {title, url, techs} = request.body

  const repositorie = {id: uuid(), title, url, techs, likes: 0}
  
  repositories.push(repositorie)

  return response.json(repositorie)
})

api.put('/repositories/:id', (request, response) => {
  const {id} = request.params;
  let {title, url, techs} = request.body;

  const repositoriIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositoriIndex < 0) {
    return response.status(400).json({mensage: 'repositorie not found'})
  }

  const old = repositories[repositoriIndex]
  
  if (!title) {
    title = old.title
  }

  if (!url) {
    url = old.url
  }

  if (!techs) {
    techs = old.techs
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: old.likes
  }

  repositories[repositoriIndex] = repositorie

  return response.json(repositorie)
})


api.delete('/repositories/:id', (request, response) => {
  const {id} = request.params;

  const repositoriIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositoriIndex < 0) {
    return response.status(400).json({mensage: 'repositorie not found'})
  }

 repositories.splice(repositoriIndex, 1)

  return response.status(204).send()
})

api.post('/repositories/:id/like', isValaidId, (request, response) => {
  const {id} = request.params;

  const repositoriIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositoriIndex < 0) {
    return response.status(400).json({mensage: 'repositorie not found'})
  }

  repositories[repositoriIndex].likes++

  const repositorie = repositories[repositoriIndex]

  return response.json(repositorie)
})


api.listen(3333, () => {
  console.log('🚀️ Back-end Started')
})