const urlAPI = "https://projet-pharmacie-maytraud.onrender.com/api/medicaments";

export function getMedicaments(page = 0, size = 10) {
  const fetchOptions = { method: "GET" };
   
  return fetch(`${urlAPI}?page=${page}&size=${size}`, fetchOptions)
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
  const medAEnvoyer = {
    nom: nouveauMedicament.nom,
    quantiteParUnite: nouveauMedicament.quantiteParUnite || nouveauMedicament.forme || "",
    unitesEnStock: nouveauMedicament.unitesEnStock || nouveauMedicament.quantiteStock || nouveauMedicament.stock || 0,
    imageURL: nouveauMedicament.photo || nouveauMedicament.imageURL || "https://via.placeholder.com/150",
    categorie: "https://projet-pharmacie-maytraud.onrender.com/api/categories/" + nouveauMedicament.categorieId
  };

  return fetch(urlAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medAEnvoyer)
  })
  .then(async (response) => {
    // Si le serveur n'est pas content (ex: 409)
    if (!response.ok) {
      const messageServeur = await response.text();
      throw new Error(`Refus du serveur (${response.status}) : ${messageServeur}`);
    }
  })
  .catch((error) => {
    console.error("🛑 DÉTAIL DU CRASH (AJOUT) :", error);
    throw error;
  });
}

export function supprimerMedicament(id) {
  console.log("🗑️ Tentative de suppression du médicament ID :", id);
  
  return fetch(urlAPI + "/" + id, {
    method: "DELETE"
  })
  .then(async (response) => {
    if (!response.ok) {
      const messageServeur = await response.text();
      throw new Error(`Refus du serveur (${response.status}) : ${messageServeur}`);
    }
  })
  .catch((error) => {
    console.error("🛑 DÉTAIL DU CRASH (SUPPRESSION) :", error);
    throw error;
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

