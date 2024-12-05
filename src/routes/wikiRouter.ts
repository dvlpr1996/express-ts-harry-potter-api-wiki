import express, { Request, Response } from 'express';
const wikiRouter = express.Router();

import apiController from '../controllers/apiController';
import bookController from '../controllers/bookController';
import characterController from '../controllers/characterController';
import spellController from '../controllers/spellController';
import potionController from '../controllers/potionController';
import houseController from '../controllers/houseController';
import staffController from '../controllers/staffController';
import studentController from '../controllers/studentController';
import normalCharacterController from '../controllers/normalCharacterController';
import movieController from '../controllers/movieController';
import { validateBookIdParam, validateBookSlugParam } from '../validation/validateParam';

// wikiRouter.get('/', apiController.index);

// Book routes
wikiRouter.get('/books', bookController.index);
wikiRouter.get('/books/:bookId([1-7])', validateBookIdParam, bookController.showById);
wikiRouter.get('/books/:bookSlug([a-zA-z-]+)', validateBookSlugParam, bookController.showBySlug);

// // Character routes
// wikiRouter.get('/characters', characterController.index);
// wikiRouter.get('/characters/:character', characterController.show);

// // Spell routes
// wikiRouter.get('/spells', spellController.index);
// wikiRouter.get('/spells/:spell', spellController.show);

// // Potion routes
// wikiRouter.get('/potions', potionController.index);
// wikiRouter.get('/potions/:potion', potionController.show);

// // House routes
// wikiRouter.get('/houses', houseController.index);
// wikiRouter.get('/houses/:house', houseController.show);
// wikiRouter.get('/houses/:house/features', houseController.showFeatures);

// // Staff routes
// wikiRouter.get('/staffs', staffController.index);
// wikiRouter.get('/staffs/:character', staffController.show);

// // Student routes
// wikiRouter.get('/students', studentController.index);
// wikiRouter.get('/students/:character', studentController.show);

// // Normal Character routes
// wikiRouter.get('/peoples', normalCharacterController.index);
// wikiRouter.get('/peoples/:character', normalCharacterController.show);

// // Movie routes
// wikiRouter.get('/movies', movieController.index);
// wikiRouter.get('/movies/:movie', movieController.show);
// wikiRouter.get('/movies/:movie/stars', movieController.showStars);
// wikiRouter.get('/movies/:movie/producers', movieController.showProducers);

// Fallback route
wikiRouter.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Error 404: Not Found',
  });
});

export default wikiRouter;
