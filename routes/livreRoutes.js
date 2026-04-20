import { Router } from 'express';
import { livreController } from '../controllers/livreController.js';

const router = Router();

router.get(   '/',              livreController.liste);
router.get(   '/recherche',     livreController.rechercher);
router.get(   '/ajouter',       livreController.ajouterForm);
router.post(  '/ajouter',       livreController.ajouter);
router.get(   '/:id',           livreController.details);
router.get(   '/:id/modifier',  livreController.modifierForm);
router.post(  '/:id/modifier',  livreController.modifier);
router.post(  '/:id/supprimer', livreController.supprimer);

export default router;