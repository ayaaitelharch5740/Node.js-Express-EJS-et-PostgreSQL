import { Router } from 'express';
import { auteurController } from '../controllers/auteurController.js';

const router = Router();

router.get(   '/',              auteurController.liste);
router.get(   '/ajouter',       auteurController.ajouterForm);
router.post(  '/ajouter',       auteurController.ajouter);
router.get(   '/:id',           auteurController.details);
router.get(   '/:id/modifier',  auteurController.modifierForm);
router.post(  '/:id/modifier',  auteurController.modifier);
router.post(  '/:id/supprimer', auteurController.supprimer);

export default router;