import { LivreModel }  from '../models/livreModel.js';
import { AuteurModel } from '../models/auteurModel.js';

export const livreController = {
  liste: async (req, res) => {
    try {
      const { rows } = await LivreModel.getAll();
      res.render('pages/livres/liste', { title: 'Livres', livres: rows, searchTerm: '' });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  rechercher: async (req, res) => {
    try {
      const term = req.query.q || '';
      const { rows } = await LivreModel.search(term);
      res.render('pages/livres/liste', { title: `Recherche : "${term}"`, livres: rows, searchTerm: term });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  ajouterForm: async (req, res) => {
    try {
      const { rows: auteurs } = await AuteurModel.getAll();
      res.render('pages/livres/ajouter', { title: 'Ajouter un livre', livre: {}, auteurs, errors: [] });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  ajouter: async (req, res) => {
    try {
      const { titre, auteur_id } = req.body;
      if (!titre?.trim() || !auteur_id) {
        const { rows: auteurs } = await AuteurModel.getAll();
        return res.render('pages/livres/ajouter', {
          title: 'Ajouter un livre',
          livre: req.body,
          auteurs,
          errors: ['Le titre et l\'auteur sont obligatoires.']
        });
      }
      const data = { ...req.body, disponible: req.body.disponible === 'on' };
      await LivreModel.create(data);
      res.redirect('/livres');
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  details: async (req, res) => {
    try {
      const { rows } = await LivreModel.getById(req.params.id);
      if (!rows[0]) return res.status(404).render('pages/404', { title: 'Introuvable' });
      res.render('pages/livres/details', { title: rows[0].titre, livre: rows[0] });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  modifierForm: async (req, res) => {
    try {
      const { rows: livres } = await LivreModel.getById(req.params.id);
      const { rows: auteurs } = await AuteurModel.getAll();
      if (!livres[0]) return res.status(404).render('pages/404', { title: 'Introuvable' });
      res.render('pages/livres/modifier', { title: 'Modifier livre', livre: livres[0], auteurs, errors: [] });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  modifier: async (req, res) => {
    try {
      const data = { ...req.body, disponible: req.body.disponible === 'on' };
      await LivreModel.update(req.params.id, data);
      res.redirect(`/livres/${req.params.id}`);
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  supprimer: async (req, res) => {
    try {
      await LivreModel.delete(req.params.id);
      res.redirect('/livres');
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  }
};