const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/Post');


mongoose.connect('mongodb+srv://dennihous:Proteam4@cluster0.0yfhece.mongodb.net/social?retryWrites=true&w=majority', {useNewUrlParser: true}, async (err) => {
  if (err) {
    console.log('MONGO ERROR')
    throw new Error(err)
  }
  console.log("Connected to MONGO")

  const user = await User.findOne({ username: 'dennis' })
  const posts = await Post.find({userId: user._id})

  console.log('rrrrrrr', posts)
})