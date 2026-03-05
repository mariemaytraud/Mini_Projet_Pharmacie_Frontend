// medicament
export class Medicament {
  constructor (medicamentJSON) { // en paramètre un médicament au format JSON
  this._id = medicamentJSON.reference 
  this._nom = medicamentJSON.nom // on met un nom plus simple que dans le json
  this._quantiteParUnite = medicamentJSON.quantiteParUnite
  this._quantiteStock = medicamentJSON.unitesEnStock
  this._photo= medicamentJSON.imageURL
  }
  // getters
  get id() { return this._id }
  get nom() { return this._nom }
  get quantiteParUnite() { return this._quantiteParUnite }
  get quantiteStock() { return this._quantiteStock }
  get photo() { return this._photo }

  toString() { return `--> ${this._nom} (${ this._quantiteParUnite})`; }
  }