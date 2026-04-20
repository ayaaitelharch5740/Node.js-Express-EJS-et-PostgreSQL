import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import auteurRoutes from './routes/auteurRoutes.js';
import livreRoutes  from './routes/livreRoutes.js';
import { LivreModel }  from './models/livreModel.js';
import { AuteurModel } from './models/auteurModel.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 3000;

// Moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Page d'accueil avec statistiques
app.get('/', async (_, res) => {
  try {
    const [{ rows: [{ count: nbAuteurs }] }, { rows: [{ count: nbLivres }] }, { rows: [{ count: nbDispo }] }] =
      await Promise.all([AuteurModel.count(), LivreModel.count(), LivreModel.countDisponible()]);
    res.render('pages/accueil', {
      title: 'Accueil – Bibliothèque',
      stats: { auteurs: nbAuteurs, livres: nbLivres, disponibles: nbDispo }
    });
  } catch (err) {
    res.render('pages/accueil', { title: 'Accueil – Bibliothèque', stats: null });
  }
});

// Routes
app.use('/auteurs', auteurRoutes);
app.use('/livres',  livreRoutes);

// 404
app.use((_, res) =>
  res.status(404).render('pages/404', { title: 'Page non trouvée' })
);

// Erreur globale
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', { title: 'Erreur serveur', message: err.message });
});

app.listen(PORT, () =>
  console.log(`✅  Bibliothèque en ligne → http://localhost:${PORT}`)
);