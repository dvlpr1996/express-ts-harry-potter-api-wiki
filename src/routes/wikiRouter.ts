import express, { Request, Response } from 'express';
const wikiRouter = express.Router();

import bookController from '../controllers/bookController';
import characterController from '../controllers/characterController';
import spellController from '../controllers/spellController';
import potionController from '../controllers/potionController';
import houseController from '../controllers/houseController';
import staffController from '../controllers/staffController';
import studentController from '../controllers/studentController';
import normalCharacterController from '../controllers/normalCharacterController';
import movieController from '../controllers/movieController';
import {
  validateBookIdParam,
  validateIdParam,
  validateIdsParam,
  validatePageQuery,
  validateSlugParam,
} from '../validation/validateParam';

// Book routes
wikiRouter.get('/books', bookController.index);
wikiRouter.get('/books/:bookId([1-7])', validateBookIdParam, bookController.showById);
wikiRouter.get('/books/:slug([a-zA-z-]+)', validateSlugParam, bookController.showBySlug);

// Character routes
wikiRouter.get('/characters', validatePageQuery, characterController.index);
wikiRouter.get('/characters/:id([\\d]+)', validateIdParam, characterController.showById);
wikiRouter.get('/characters/:ids([\\d,]+)', validateIdsParam, characterController.showByIds);
wikiRouter.get('/characters/:slug([a-zA-z-]+)', validateSlugParam, characterController.showBySlug);

// Spell routes
wikiRouter.get('/spells', validatePageQuery, spellController.index);
wikiRouter.get('/spells/:id([\\d]+)', validateIdParam, spellController.showById);
wikiRouter.get('/spells/:ids([\\d,]+)', validateIdsParam, spellController.showByIds);
wikiRouter.get('/spells/:slug([a-zA-z-]+)', validateSlugParam, spellController.showBySlug);

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

export default wikiRouter;
