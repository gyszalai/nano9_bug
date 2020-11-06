const waitOn = require('wait-on')

const couchdb231Url = 'http://admin:admin@localhost:5984'
const couchdb311Url = 'http://admin:admin@localhost:15984'
const nano231 = require('nano')(couchdb231Url)
const nano311 = require('nano')(couchdb311Url)

async function start231 () {
  const dbName = 'mydb'
  await nano231.db.create(dbName)
  const db = nano231.use(dbName)
  for (let i = 0; i < 3000; i++) {
    console.log('idx: ', i)
    await db.insert({ _id: 'key_' + i, someProp: 'test_' + i })
  }
}

async function start311 () {
  const dbName = 'mydb'
  await nano311.db.create(dbName)
  const db = nano311.use(dbName)
  for (let i = 0; i < 3000; i++) {
    console.log('idx: ', i)
    await db.insert({ _id: 'key_' + i, someProp: 'test_' + i })
  }
}

async function run () {
  await waitOn({
    resources: [couchdb231Url, couchdb311Url], 
    auth: { username: 'admin', password: 'admin' }, 
    timeout: 15000,
    log: true
  })
  console.log('couchdb 2.3.1')
  await start231()
  console.log('couchdb 3.1.1')
  await start311()
}

run()
