const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs')
const app = express()
const dbFile = 'db.json'
const updatedDbFile = 'updatedDb.json'
const updatedPatientFile = 'updatedPatient.json'
const updatedPhysicain01File = 'updatedPhysicain01.json'
const updatedPhysician02File = 'updatedPhysician02.json'
const updatedAdminFile = 'updatedAdmin.json'
const PORT = 3001

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

function loadFile(fileName) {
  return JSON.parse(fs.existsSync(fileName) ? fs.readFileSync(fileName).toString() : '""')
}

function saveFile(fileName, data) {
  return fs.writeFileSync(fileName, JSON.stringify(data))
}

// saving data to db.json from post request
app.post('/', (req, res) => {
  // let fileData = loadFile(dbFile)
  // // console.log(req.body)
  // let newData = req.body.data
  // console.log(newData)
  // fileData = [
  //   ...fileData,
  //   ...newData
  // ]
  // saveFile(dbFile, fileData)
  res.send('success')
})

// refining - converting array of objects to array of strings
app.get('/refineData', (req, res) => {
  // console.log(fs.readFileSync('db.json').toString())
  // res.send(JSON.stringify(fs.readFileSync('db.json').toJSON))

  let fileData = loadFile(dbFile)
  // console.log(req.body)
  // let newData = req.body.data
  // console.log(newData)
  // fileData = [
  //   ...fileData,
  //   ...newData
  // ]
  let newArray = []
  fileData.forEach(element => {
    newArray.push(element.constName)
  });
  saveFile(updatedDbFile, newArray)
  res.send('success')
})

// merging - merging all the refined files into one array in one file
app.get('/mergeData', async (req, res) => {

  let updatedPatient =  loadFile(updatedPatientFile)
  let updatedPhysicain01 =  loadFile(updatedPhysicain01File)
  let updatedPhysician02 =  loadFile(updatedPhysician02File)
  let updatedAdmin =  loadFile(updatedAdminFile)
  let newArray = [
    ...updatedAdmin,
    ...updatedPhysicain01,
    ...updatedPhysician02,
    ...updatedPatient
  ]

  newArray = [
    ...new Set(newArray)
  ]

  // uniq = [...new Set(array)];
  
  saveFile(updatedDbFile, newArray)
  res.send('success')
})

app.listen(PORT, () => {
  console.log('Server started on port ',PORT)
  
  // console.log(JSON.parse(fs.readFileSync('db.json').toString()))
})