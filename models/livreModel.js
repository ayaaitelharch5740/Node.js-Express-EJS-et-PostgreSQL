import { query } from '../config/db.js';

export const LivreModel = {
  getAll: () =>
    query(
      `SELECT l.*, a.nom AS auteur_nom, a.prenom AS auteur_prenom
       FROM livres l JOIN auteurs a ON l.auteur_id = a.id ORDER BY l.titre`
    ),

  getById: (id) =>
    query(
      `SELECT l.*, a.nom AS auteur_nom, a.prenom AS auteur_prenom
       FROM livres l JOIN auteurs a ON l.auteur_id = a.id WHERE l.id = $1`,
      [id]
    ),

  create: (d) =>
    query(
      `INSERT INTO livres (titre, auteur_id, annee_publication, genre, isbn, resume, disponible)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [d.titre, d.auteur_id, d.annee_publication || null, d.genre, d.isbn, d.resume, d.disponible ?? true]
    ),

  update: (id, d) =>
    query(
      `UPDATE livres SET titre=$1, auteur_id=$2, annee_publication=$3, genre=$4,
       isbn=$5, resume=$6, disponible=$7 WHERE id=$8 RETURNING *`,
      [d.titre, d.auteur_id, d.annee_publication || null, d.genre, d.isbn, d.resume, d.disponible, id]
    ),

  delete: (id) =>
    query('DELETE FROM livres WHERE id = $1 RETURNING *', [id]),

  search: (term) =>
    query(
      `SELECT l.*, a.nom AS auteur_nom, a.prenom AS auteur_prenom
       FROM livres l JOIN auteurs a ON l.auteur_id = a.id
       WHERE l.titre ILIKE $1 OR a.nom ILIKE $1 OR a.prenom ILIKE $1 OR l.genre ILIKE $1
       ORDER BY l.titre`,
      [`%${term}%`]
    ),

  count: () =>
    query('SELECT COUNT(*) FROM livres'),

  countDisponible: () =>
    query("SELECT COUNT(*) FROM livres WHERE disponible = TRUE"),
};