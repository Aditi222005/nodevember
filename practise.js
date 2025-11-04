//import figlet from "figlet";
import chalk from "chalk";
/*
async function doStuff() {
  const text = await figlet.text("hello");
 
  console.log(chalk.bgGrey(text))
}

doStuff();*/
/*
const handler=(...name)=>{
    console.log(`hello ${name}`)
}
console.log(chalk.greenBright('DT','Bunny')) */
/*
const MI={
    name:'Hitman',
    record : 17
}
console.log(MI.record)*/
/*const workshop = {
  name: 'Aditi',
  age: 20,
  event: {
    organizer: 'GDGoC',
    eventName: 'Think in C',
    duration: '9 days'
  },
  printDetails: function () {
    console.log(`I'm ${this.name} the Organizer of ${this.event.eventName}. The duration of the event is ${this.event.duration}`)
  }
}
//workshop.printDetails()
//console.log(Object.keys(workshop.event))
//console.log(Object.values(workshop))
console.log(Object.entries(workshop))
*/
/*const a='{"key1":"value1", "key2":"value2"}' //type -> string
const obj=JSON.parse(a)
console.log(chalk.blueBright(typeof(obj)))    //type -> string to Object
const str=JSON.stringify(obj)
console.log(chalk.cyanBright(typeof(str)))    //type -> Object to string
*/
//Asynchronous JS 
// console.log('one')
// setTimeout(()=>{
//   console.log('two')
// },3000)
// console.log('three')

//callback 
// const first=()=>{
//   console.log('before callback...')
//   callback()
//   console.log('after callback...')

// }
// const second=()=>{
//   console.log('Inside callback function...')
// }
// first()

// Promises
// const promise =new Promise((resolve,reject)=>{
//   console.log("I'm inside promise")
//   //resolve('Success')
//   reject('Failure')

// })
// promise
// .then((msg)=>{
//   console.log(msg)
// })
// .catch((err)=>{
//   console.log(err)
// })

// function getData(){
//   return new Promise((resolve,reject)=>{
//     console.log('Data is getting fetched...')
//     setTimeout(()=>{
//       resolve('Data fetching successful')

//     },2000)
//   })
// }
// getData(1).then((msg)=>{
//   getData(2).then((msg)=>{
//   console.log('data: 2 fetched')
//   })
// })
// .catch((err)=>{
//   console.log(err)
// })

// Async Await

function getData(id){
  return new Promise((resolve,reject)=>{
    console.log('Data is getting fetched...')
    setTimeout(()=>{
      resolve(`Data: ${id}`)
   // reject('Error fetching data')
    })
  },2000)
  
}

const getAllData=async()=>{
  try{
  await getData(1)
  await getData(2)
  await getData(3)
  await getData(4)
  }
  catch(err){
    console.log(err)
  }
}
getAllData()
