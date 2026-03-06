
<script setup>
import { reactive, onMounted } from 'vue';
import { Medicament } from '@/model/Medicament.js';
import MedicamentCard from '@/components/MedicamentCard.vue';
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

function handlerSupprimer(id) {
  if (med.uniteEnStock > 0) {
    med.uniteEnStock = med.uniteEnStock - 1;
    modifierMedicament(med).then(() => {
      chargerMedicaments();
    });
  }
  supprimerMedicament(id).then(() => {
    chargerMedicaments();
  });
}

function handlerAjouter(med) {
med.quantiteStock = med.quantiteStock + 1;
modifierMedicament(med).then(() => {
  chargerMedicaments();
});
}

function handlerRetirer(med) {
  if (med.quantiteStock > 0) {
    med.quantiteStock = med.quantiteStock - 1;
    modifierMedicament(med).then(() => {
      chargerMedicaments();
    });
  }
}

function handlerAjouterNouveau(med) {
  ajouterMedicament(med).then(() => {
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

    <v-row>
      <v-col v-for="med in listeMedicaments" :key="med.id" cols="3">
        <MedicamentCard :medicament="med" 
          @supprimer="handlerSupprimer" 
          @ajouterStock="handlerAjouter" 
          @retirerStock="handlerRetirer"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

