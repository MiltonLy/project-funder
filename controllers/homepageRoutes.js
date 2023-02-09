const { Project, User } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const projects = projectData.map((project) => project.get({ plain: true }));
    res.render('index', { projects });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/project/:id', withAuth, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id)
        // project by ID
        res.render('', {project});
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// It's done when the /profile route renders the logged-in user's projects and a form to create a new project.
router.get('/project', withAuth, async (req, res) => {
    try {
        // matching user email with db
        const userProjects = await Project.findAll({
            where: {
                // is this right?
                user_id: req.session.user_id
            },
        })
        const projects = userProjects.map((project) => project.get({ plain:true }));
        // projects by user
        res.render('project', { projects });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('login')
});

module.exports = router;
