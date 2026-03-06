// medicament
export class Medicament {
  constructor (medicamentJSON) { // en paramètre un médicament au format JSON
  
    // 1. L'astuce pour récupérer l'ID caché par Spring Boot
    if (jsonMed._links && jsonMed._links.self) {
      const url = jsonMed._links.self.href;
      const urlCoupee = url.split('/');
      this.id = urlCoupee[urlCoupee.length - 1]; // On prend le dernier chiffre de l'URL
    } else {
      this.id = jsonMed.id; 
    }
  
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