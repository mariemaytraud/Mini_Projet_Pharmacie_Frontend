
<script setup>
import { reactive, onMounted } from 'vue';
import { Medicament } from '@/model/Medicament.js';
import TableauMedicaments from '@/components/TableauMedicaments.vue';
import {getMedicaments, ajouterMedicament, supprimerMedicament, modifierMedicament } from '@/service/APIservice.js';
import MedicamentFormulaire from '@/components/MedicamentFormulaire.vue';

const listeMedicaments = reactive([]);

function chargerMedicaments() {
  getMedicaments().then((dataJSON) => {
    
    if (dataJSON && dataJSON._embedded && dataJSON._embedded.medicaments) {
      let medsBruts = dataJSON._embedded.medicaments;
      
  
      listeMedicaments.splice(0, listeMedicaments.length);

      medsBruts.forEach((medJson) => {
        listeMedicaments.push(new Medicament(medJson));
      });
    }
  });
}

function handlerSupprimer(idRecu) {
  supprimerMedicament(idRecu).then(() => {
      chargerMedicaments();
    });
  }

function handlerAjouter(med) {
  const medModifie = {...med, quantiteStock: med.quantiteStock + 1};
  modifierMedicament(medModifie).then(() => {
  chargerMedicaments();
  });
}

function handlerRetirer(med) {
  if(med.quantiteStock > 0) {
    const medModifie = {...med, quantiteStock: med.quantiteStock - 1};
    modifierMedicament(medModifie).then(() => {
      chargerMedicaments();
    });
  }
  supprimerMedicament(idRecu).then(() => {
      chargerMedicaments();
    });

  }

function handlerAjouterNouveau(nouveauMed) {
  ajouterMedicament(nouveauMed).then(() => {
    chargerMedicaments();
  });
}

onMounted(() => {
  chargerMedicaments();
});
</script>

<template>
  <v-container>
    <h1 class="text-center MaPharmacie"> Ma Pharmacie</h1>

    <MedicamentFormulaire @addMed="handlerAjouterNouveau" />

    <TableauMedicaments 
      :medicaments="listeMedicaments" 
      @supprimer="handlerSupprimer" 
      @ajouterStock="handlerAjouter" 
      @retirerStock="handlerRetirer"
    />
  </v-container>
</template>

