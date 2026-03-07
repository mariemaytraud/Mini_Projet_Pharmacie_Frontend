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
  const fetchOptions = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nouveauMedicament) };
 
  return fetch(urlAPI, fetchOptions)
  .then((response) => {return response.json();})
  .catch((error) => {
  console.log(error);
  });
}

  export function supprimerMedicament(id) {
    const fetchOptions = { method: "DELETE" };

    return fetch(urlAPI + "/" + id, fetchOptions)
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

