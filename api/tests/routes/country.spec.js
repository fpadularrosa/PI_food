/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'dificil',
  score: '',
  healthScore: '',
  steps: '',
  image: '',
  dish: ''
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('Deberia devolver un error si no tiene nada la receta', (done)=>{
        Recipe.create({})
          .then(() => done(new Error('It requires attributes')))
          .catch(() => done());
          agent.get('/recipes').expect(404)
      }
    )
    it('Si mandan name por query, deberia recibir recetas con ese name', () => {
      agent.get('/recipes?name=milanea a la napolitana')
      .expect(res => res.body.to.eql(recipe))
    })
  });
});