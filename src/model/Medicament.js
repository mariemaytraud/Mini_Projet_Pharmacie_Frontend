// medicament
export class Medicament {
  constructor (medicamentJSON) { // en paramètre un médicament au format JSON
  
    // pour récupérer l'ID caché par Spring Boot
    if (medicamentJSON._links && medicamentJSON._links.self) {
      let url = medicamentJSON._links.self.href;
    
      url = url.split('{')[0]; // On enlève la partie entre accolades
      const urlCoupee = url.split('/');
      this.id = urlCoupee[urlCoupee.length - 1]; // On prend le dernier chiffre de l'URL
    } else {
      this.id = medicamentJSON.id; 
    }
  
  
  this.nom = medicamentJSON.nom // on met un nom plus simple que dans le json
  this.quantiteParUnite = medicamentJSON.quantiteParUnite
  this.quantiteStock = medicamentJSON.unitesEnStock
  this.photo= medicamentJSON.imageURL
  }

  toString() { return `--> ${this.nom} (${ this.quantiteParUnite})`; }
  }