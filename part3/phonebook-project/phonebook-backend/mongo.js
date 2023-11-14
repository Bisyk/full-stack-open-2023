if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(result =>{
  console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  mongoose.connection.close()
})