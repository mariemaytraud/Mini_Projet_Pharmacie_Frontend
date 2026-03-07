const urlAPI = "https://projet-pharmacie-maytraud.onrender.com/api/medicaments";

export function getMedicaments() {
  const fetchOptions = { method: "GET" };
   
  return fetch(urlAPI, fetchOptions)
  .then((response) => {
  return response.json();
  })
  .then((dataJSON) => {
  console.log(dataJSON);
  return dataJSON;
  })
  .catch((error) => {
  console.log(error);
  });
  }

export function ajouterMedicament(nouveauMedicament) {
  // On s'assure d'envoyer les bons mots au serveur (imageURL au lieu de photo, etc.)
  const medAEnvoyer = {
    nom: nouveauMedicament.nom,
    quantiteParUnite: nouveauMedicament.quantiteParUnite || nouveauMedicament.forme || "",
    unitesEnStock: nouveauMedicament.unitesEnStock || nouveauMedicament.quantiteStock || nouveauMedicament.stock || 0,
    imageURL: nouveauMedicament.photo || nouveauMedicament.imageURL || "https://via.placeholder.com/150"
  };

  const fetchOptions = { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(medAEnvoyer) 
  };
 
  return fetch(urlAPI, fetchOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors de l'ajout");
      // ⚠️ LE SECRET : On ne fait SURTOUT PAS response.json() ici car Spring Boot renvoie du vide !
    })
    .catch((error) => {
      console.log(error);
    });
}

export function supprimerMedicament(id) {
  const fetchOptions = { method: "DELETE" };

  return fetch(urlAPI + "/" + id, fetchOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      // Pareil, on attend juste que ça se termine sans essayer de lire un JSON
    })
    .catch((error) => {
      console.log(error);
    });
}

export function modifierStockMedicament(id, nouvelleQuantite) {
  return fetch(urlAPI + "/" + id, {
    method: "PATCH", 
    headers: { "Content-Type": "application/json" },
    
    body: JSON.stringify({ unitesEnStock: nouvelleQuantite }) 
  }).then((res) => {
    if (!res.ok) throw new Error("Erreur serveur lors de la modification du stock");
    return res.json();
  });
}

