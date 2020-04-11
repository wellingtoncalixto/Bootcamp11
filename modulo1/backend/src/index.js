const express = require('express'); 
const {uuid, isUuid} = require('uuidv4')
const api = express();

api.use(express.json());


const projects = [];

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

api.use(logRequest)
api.use('/projects/:id', isValaidId)


api.get('/projects', (request, response) => {

  return response.json(projects);
})

api.post('/projects', (request, response) => {
  const {title, owner} = request.body

  const project = {id: uuid(), title, owner}
  
  projects.push(project)

  return response.json(project)
})

api.put('/projects/:id', (request, response) => {
  const {id} = request.params;
  const {title, owner} = request.body;

  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0) {
    return response.status(400).json({mensage: 'project not found'})
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project

  return response.json(project)
})


api.delete('/projects/:id', (request, response) => {
  const {id} = request.params;
  const {title, owner} = request.body;

  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0) {
    return response.status(400).json({mensage: 'project not found'})
  }

 projects.splice(projectIndex, 1)

  return response.status(204).send()
})


api.listen(3333, () => {
  console.log('🚀️ Back-end Started')
})