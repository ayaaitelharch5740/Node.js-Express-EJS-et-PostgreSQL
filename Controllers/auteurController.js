import { AuteurModel } from '../models/auteurModel.js';

export const auteurController = {
  liste: async (req, res) => {
    try {
      const { rows } = await AuteurModel.getAll();
      res.render('pages/auteurs/liste', { title: 'Auteurs', auteurs: rows });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  ajouterForm: (_, res) =>
    res.render('pages/auteurs/ajouter', { title: 'Ajouter un auteur', auteur: {}, errors: [] }),

  ajouter: async (req, res) => {
    try {
      const { nom, prenom } = req.body;
      if (!nom?.trim() || !prenom?.trim()) {
        return res.render('pages/auteurs/ajouter', {
          title: 'Ajouter un auteur',
          auteur: req.body,
          errors: ['Le nom et le prénom sont obligatoires.']
        });
      }
      await AuteurModel.create(req.body);
      res.redirect('/auteurs');
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  details: async (req, res) => {
    try {
      const { rows: au } = await AuteurModel.getById(req.params.id);
      if (!au[0]) return res.status(404).render('pages/404', { title: 'Introuvable' });
      const { rows: livres } = await AuteurModel.getLivres(req.params.id);
      res.render('pages/auteurs/details', {
        title: `${au[0].prenom} ${au[0].nom}`,
        auteur: au[0],
        livres
      });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  modifierForm: async (req, res) => {
    try {
      const { rows } = await AuteurModel.getById(req.params.id);
      if (!rows[0]) return res.status(404).render('pages/404', { title: 'Introuvable' });
      res.render('pages/auteurs/modifier', { title: 'Modifier auteur', auteur: rows[0], errors: [] });
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  modifier: async (req, res) => {
    try {
      await AuteurModel.update(req.params.id, req.body);
      res.redirect(`/auteurs/${req.params.id}`);
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  },

  supprimer: async (req, res) => {
    try {
      await AuteurModel.delete(req.params.id);
      res.redirect('/auteurs');
    } catch (err) {
      res.status(500).render('pages/error', { title: 'Erreur', message: err.message });
    }
  }
};