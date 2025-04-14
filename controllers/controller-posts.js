const posts = require('../data/posts')

function index(req,res) {

    let postsFiltered = posts

    if (req.query.tag) {
        postsFiltered = posts.filter(post => post.tags.includes(req.query.tag))
    }
    
    res.json(postsFiltered);
}

function show(req,res) { 
    const post = posts.find(post => post.slug === req.params.id)

    if (!post) {
        return res.status(404).json({
            error: 'Error 404',
            message: 'Post not found'
        })
    }

    res.json(post)


}

function store(req,res) {

    function generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/\s+/g, '-')
    } 

    const newSlug = generateSlug(req.body.title)

    const newPost = {
        title: req.body.title,
        slug: newSlug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.image
    }

    posts.push(newPost)

    console.log(posts);

    res.status(201)

    res.json(newPost)
    
}

function update(req,res) {
    function generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/\s+/g, '-')
    } 

    const newSlug = generateSlug(req.body.title)


    const post = posts.find(post => post.slug === req.params.id)

    if (!post) {
        return res.status(404).json({
            error: 'Error 404',
            message: 'Post not found'
        })
    }

    post.title = req.body.title
    post.slug = newSlug
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags

    console.log(posts);
    

    res.json(post)
}

function modify(req,res) {
    res.send(`Modify post with slug: ${req.params.slug}`);
}

function destroy(req,res) {
    const post = posts.find(post => post.slug === req.params.id)

    if (!post) {
        return res.status(404).json({
            error: 'Error 404',
            message: 'Post not found'
        })
    }

    posts.splice(posts.indexOf(post), 1)

    console.log(posts);
    
    res.sendStatus(204)

}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}
