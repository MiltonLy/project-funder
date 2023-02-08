const { Project, User } = require('../models');
const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        const projectData = await Project.findAll({
            include: [{
                model: User
            }]
        })
        const projects = projectData.map((project) => project.get({ plain: true }));
        res.render('index', {projects});
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;