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
    console.log({ projects, logged_in: req.session?.logged_in });
    res.render('index', { projects, logged_in: req.session?.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const project = await Project.findByPk({
      where: {
        id: req.params.id,
      },
    });
    res.render('', { project, logged_in: req.session?.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// It's done when the /profile route renders the logged-in user's projects and a form to create a new project.
router.get('/project', withAuth, async (req, res) => {});

router.get('/login', (req, res) => {
  res.render('login');
});
module.exports = router;
