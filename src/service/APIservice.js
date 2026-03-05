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

export function modifierMedicament(id, medicamentModifie) {
  const fetchOptions = { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(medicamentModifie) };

return fetch(urlAPI + "/" + id, fetchOptions)
.then((response) => {return response.json();})
.catch((error) => {
console.log(error);
});
}

