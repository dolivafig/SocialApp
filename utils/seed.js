const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});
  await Reaction.deleteMany({});

  const users = [{
    username: "danolifi",
    email: "danoli@gmail.com",
    thoughts: [],
    friends: []
  },
{
  username: "test1",
email: "test@gmail.com",
thoughts: [],
friends: []}];

  const thoughts = [{
    thoughtText: "coding is really cool",
    username: "danolifi",
    reactions: [{
    reactionBody: "agree",
    username: "test1",
  }]
  }];


  // for (let i = 0; i < 20; i++) {
  //   const fullName = getRandomName();
  //   const first = fullName.split(' ')[0];
  //   const last = fullName.split(' ')[1];

  //   users.push({
  //     first,
  //     last,
  //     age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
  //   });
  // }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.table(reactions)
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
