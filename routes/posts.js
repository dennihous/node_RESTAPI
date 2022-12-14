const User = require("../models/User")
const router = require("express").Router()
const Post = require("../models/Post")

// Create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch(err) {
    res.status(500).json(err)
  }
})

// Update a post
router.put('/:id', async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    if(post.userId === req.body.userId){
      await post.updateOne({$set:req.body})
      res.json(200).json("Post has been updated")
    } else {
      res.status(403).json("You can only update your post")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// Delete a post
router.delete('/:id', async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    if(post.userId === req.body.userId){
      await post.deleteOne()
      res.status(200).json("Post has been deleted")
    } else {
      res.status(403).json("You can only delete your post")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// Like and dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post.likes.includes(req.body.userId)){
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json("Post has been liked")
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json("Post has been disliked")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// Get a post
router.get("/:id", async (req, res) => {
  console.log('--------', req.params.id);
  try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch(err){
    res.status(500).json(err)
  }
})

// Get timeline posts
router.get("/timeline/:userId", async(req, res) => {
  try{
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({userId: currentUser._id })
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId })
      })
    )
    res.status(200).json(userPosts.concat(...friendsPosts))
  } catch(err) {
    res.status(500).json(err)
  }
})

// Get all users posts
router.get("/profile/:username", async(req, res) => {
  try{
    const user = await User.findOne({username: req.params.username})
    const posts = await Post.find({userId: user._id})
    res.status(200).json(posts)
  } catch(err) {
    res.status(500).json(err)
  }
})


module.exports = router