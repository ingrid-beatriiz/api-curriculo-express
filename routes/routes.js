const express = require('express');
const router = express.Router();
const Curriculo = require('../models/Curriculo');
const Experiencia = require('../models/Experiencia');

router.post('/curriculos', async (req, res) => {
  try {
    const curriculo = await Curriculo.create(req.body);
    res.status(201).json(curriculo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/curriculos', async (req, res) => {
  try {
    const curriculos = await Curriculo.findAll({
      include: [{ model: Experiencia, as: 'experiencias' }]
    });
    res.status(200).json(curriculos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.get('/curriculos/:id', async (req, res) => {
  try {
    const curriculo = await Curriculo.findByPk(req.params.id, {
      include: [{ model: Experiencia, as: 'experiencias' }]
    });
    if (!curriculo) return res.status(404).json({ erro: 'Currículo não encontrado' });
    res.status(200).json(curriculo);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.put('/curriculos/:id', async (req, res) => {
  try {
    const curriculo = await Curriculo.findByPk(req.params.id);
    if (!curriculo) return res.status(404).json({ erro: 'Currículo não encontrado' });
    
    await curriculo.update(req.body);
    res.status(200).json(curriculo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.delete('/curriculos/:id', async (req, res) => {
  try {
    const curriculo = await Curriculo.findByPk(req.params.id);
    if (!curriculo) return res.status(404).json({ erro: 'Currículo não encontrado' });
    
    await curriculo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.post('/curriculos/:id/experiencias', async (req, res) => {
  try {
    const curriculo = await Curriculo.findByPk(req.params.id);
    if (!curriculo) return res.status(404).json({ erro: 'Currículo base não encontrado' });

    const experiencia = await Experiencia.create({ ...req.body, curriculoId: curriculo.id });
    res.status(201).json(experiencia);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.put('/experiencias/:id', async (req, res) => {
  try {
    const experiencia = await Experiencia.findByPk(req.params.id);
    if (!experiencia) return res.status(404).json({ erro: 'Experiência não encontrada' });
    
    await experiencia.update(req.body);
    res.status(200).json(experiencia);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.delete('/experiencias/:id', async (req, res) => {
  try {
    const experiencia = await Experiencia.findByPk(req.params.id);
    if (!experiencia) return res.status(404).json({ erro: 'Experiência não encontrada' });
    
    await experiencia.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;