const Post = require('../models/post');
const cloudinary = require('cloudinary').v2;

module.exports = {
  // Post index.
  async postIndex(req, res) {
    const posts = await Post.find({});
    res.render('posts/index', { posts });
  },
  // New post form.
  postNew(req, res) {
    res.render('posts/new');
  },
  // Create post.
  async postCreate(req, res) {
    const {
      body: { post },
      files,
    } = req;

    const postImages = [];
    // Upload images to Cloudinary.
    for (const file of files) {
      const image = await cloudinary.uploader.upload(file.path);
      postImages.push({
        url: image.secure_url,
        public_id: image.public_id,
      });
    }

    const newPost = await Post.create({ ...post, images: postImages });

    res.redirect(`/posts/${newPost.id}`);
  },
  // Show post details.
  async postShow(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);

    res.render('posts/show', { post });
  },
  // Edit post form.
  async postEdit(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);

    res.render('posts/edit', { post });
  },
  // Post update.
  async postUpdate(req, res) {
    const { id } = req.params;
    const { post } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, post);

    res.redirect(`/posts/${updatedPost.id}`);
  },
  // Post delete.
  async postDelete(req, res) {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);

    res.redirect('/posts');
  },
};
