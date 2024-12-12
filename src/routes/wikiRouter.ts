import express from 'express';
const wikiRouter = express.Router();

import bookController from '../controllers/bookController';
import characterController from '../controllers/characterController';
import spellController from '../controllers/spellController';
import potionController from '../controllers/potionController';
import houseController from '../controllers/houseController';
import staffController from '../controllers/staffController';
import studentController from '../controllers/studentController';

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

// Potion routes
wikiRouter.get('/potions', validatePageQuery, potionController.index);
wikiRouter.get('/potions/:id([\\d]+)', validateIdParam, potionController.showById);
wikiRouter.get('/potions/:ids([\\d,]+)', validateIdsParam, potionController.showByIds);
wikiRouter.get('/potions/:slug([a-zA-z-]+)', validateSlugParam, potionController.showBySlug);

// House routes
wikiRouter.get('/houses', validatePageQuery, houseController.index);
wikiRouter.get('/houses/:id([\\d]+)', validateIdParam, houseController.showById);
wikiRouter.get('/houses/:slug([a-zA-z-]+)', validateSlugParam, houseController.showBySlug);
wikiRouter.get('/houses/:ids([\\d,]+)', validateIdsParam, houseController.showByIds);
wikiRouter.get('/houses/:id([\\d]+)/features', validateIdParam, houseController.showFeatures);

// Staff routes
wikiRouter.get('/staffs', validatePageQuery, staffController.index);
wikiRouter.get('/staffs/:id([\\d]+)', validateIdParam, staffController.showById);
wikiRouter.get('/staffs/:ids([\\d,]+)', validateIdsParam, staffController.showByIds);
wikiRouter.get('/staffs/:slug([a-zA-z-]+)', validateSlugParam, staffController.showBySlug);

// // Student routes
wikiRouter.get('/students', validatePageQuery, studentController.index);
wikiRouter.get('/students/:id([\\d]+)', validateIdParam, studentController.showById);
wikiRouter.get('/students/:ids([\\d,]+)', validateIdsParam, studentController.showByIds);
wikiRouter.get('/students/:slug([a-zA-z-]+)', validateSlugParam, studentController.showBySlug);

// // Normal Character routes
// wikiRouter.get('/peoples', normalCharacterController.index);
// wikiRouter.get('/peoples/:character', normalCharacterController.show);

// // Movie routes
// wikiRouter.get('/movies', movieController.index);
// wikiRouter.get('/movies/:movie', movieController.show);
// wikiRouter.get('/movies/:movie/stars', movieController.showStars);
// wikiRouter.get('/movies/:movie/producers', movieController.showProducers);

export default wikiRouter;
