import { query } from '../config/db.js';

export const AuteurModel = {
  getAll: () =>
    query('SELECT * FROM auteurs ORDER BY nom, prenom'),

  getById: (id) =>
    query('SELECT * FROM auteurs WHERE id = $1', [id]),

  create: (d) =>
    query(
      `INSERT INTO auteurs (nom, prenom, date_naissance, nationalite, biographie)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [d.nom, d.prenom, d.date_naissance || null, d.nationalite, d.biographie]
    ),

  update: (id, d) =>
    query(
      `UPDATE auteurs SET nom=$1, prenom=$2, date_naissance=$3,
       nationalite=$4, biographie=$5 WHERE id=$6 RETURNING *`,
      [d.nom, d.prenom, d.date_naissance || null, d.nationalite, d.biographie, id]
    ),

  delete: (id) =>
    query('DELETE FROM auteurs WHERE id = $1 RETURNING *', [id]),

  getLivres: (id) =>
    query(
      'SELECT * FROM livres WHERE auteur_id = $1 ORDER BY titre',
      [id]
    ),

  count: () =>
    query('SELECT COUNT(*) FROM auteurs'),
};