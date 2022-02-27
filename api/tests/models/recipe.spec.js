const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    },
    describe('summary', () => {
      it('should throw an error if summary is null', (done)=> {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ summary: 'Dificil receta con hongos' });
      });
    }),
    describe('Atributos obligatorios', () => {
      it('deberia devolver un error si no me pasan los atributos obligatorios.', (done) => {
        Recipe.create({score: '100', healthScore: '50', steps: 'cortar manzana', image: 'http://url', dish: 'dishtype'})
        .then(() => done(new Error('Necesito los atributos obligatorios')))
        .catch(() => done());
      })
    }),
    );
  });
});
