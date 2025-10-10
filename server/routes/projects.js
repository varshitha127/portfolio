const express = require('express');
const projectsController = require('../controllers/projectsController');

const router = express.Router();

// Get all projects
router.get('/', projectsController.getProjects);

// Get project by ID
router.get('/:id', projectsController.getProjectById);

// Create new project (admin only)
router.post('/', projectsController.createProject);

// Update project (admin only)
router.put('/:id', projectsController.updateProject);

// Delete project (admin only)
router.delete('/:id', projectsController.deleteProject);

module.exports = router; 