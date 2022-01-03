const mongoose = require("mongoose");

//DataBase Connect

require("dotenv").config({path: "./.env"});
mongoose
.connect(process.env.MONGO_URI, { 
useNewUrlParser: true, 
useUnifiedTopology: true 
}) 
.then(() => console.log("server is running "))
.catch((err) => console.error("Failed to connect"));

//Create person Prototype Shema

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
  });

//Create the model

const Person = mongoose.model("person", personSchema);

//Create and Save a Record of a Model

let newPerson = new Person({
    name: "mahmoud",
    age: 31,
    favoriteFoods: ["loubiya", "kosksi"],
 });
 newPerson.save((err) => {
   if (err) throw err;
   console.log("newPerson added succesfully!");
 });
 
 //Create Many Records with model.create()

 let arrayOfPerson = [
    { name: "youssef", age: 28, favoriteFoods: ["mloukheya", "pizza", "slata mechweya"] },
    { name: "wael", age: 29, favoriteFoods: ["mlawi", "kosksi", "fricassé"] },
    { name: "nour", age: 25, favoriteFoods: ["mtabgua", "broudou"] },
    { name: "hajer", age: 27, favoriteFoods: ["pizza", "jwajem"] },
    { name: "oussema", age: 30, favoriteFoods: ["ma9rouna", "kammouneya", "lablebi"] },
  ];
  Person.create(arrayOfPerson)
    .then((persons) => {
      console.log("Persons are succesfully saved!", persons);
    })
    .catch((err) => console.log(err));


// Find all the people having the name mounir

Person.find({ name: "Mounir" }, function (err, res) {
  if (err) throw err;
  console.log(res);
});
//  find one person's favorite food is pizza
Person.findOne({ favoriteFoods: "pizza" }, function (err, res) {
  if (err) throw err;
  console.log(res);
});
// find person by id
let personId = "60cfa322cb506d1f109fcfb1";
Person.findById(personId, function (err, res) {
  if (err) throw err;
  console.log(res);
});
//adding pizza as a favoritefood to the person with personId

Person.findById(personId).then((person) => {
  person.favoriteFoods.push("gauffre");
  person.save();
});
// Perform New Updates on a Document Using model.findOneAndUpdate()

let personName = "nour";
Person.findOneAndUpdate(
  { name: personName },
  { $set: { age: 25 } },
  { new: true }
);

// Delete One Document Using model.findByIdAndRemove
const nameToRemove = "wael";
Person.remove({ name: nameToRemove }, function (err, res) {
  if (err) throw err;
  console.log(res);
});

// Chain Search Query Helpers to Narrow Search Results
var queryChain = function (done) {
  var foodToSearch = "Ejja";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) done(err);
      done(null, data);
    });
};
