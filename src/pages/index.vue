<template>
  <v-container>
    <h1 class="text-center MaPharmacie mb-5"> Ma Pharmacie</h1>

    <MedicamentFormulaire @addMed="handlerAjouterNouveau" />

    <TableauMedicaments 
      :medicaments="listeMedicaments" 
      @supprimer="handlerSupprimer" 
      @ajouterStock="handlerAjouter" 
      @retirerStock="handlerRetirer"
    />

    <div class="text-center mt-4">
      <v-pagination
        v-model="pageCourante"
        :length="totalPages"
        @update:modelValue="chargerMedicaments"
        color="blue"
      ></v-pagination>
    </div>

  </v-container>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { Medicament } from '@/model/Medicament.js';
import TableauMedicaments from '@/components/TableauMedicaments.vue';
import MedicamentFormulaire from '@/components/MedicamentFormulaire.vue';
import { getMedicaments, ajouterMedicament, supprimerMedicament, modifierStockMedicament } from '@/service/APIservice.js';

const listeMedicaments = reactive([]);

const pageCourante = ref(1); 
const totalPages = ref(1);
// 1. RECHARGER LE TABLEAU
function chargerMedicaments() {
  getMedicaments(pageCourante.value - 1, 10).then((dataJSON) => {
    if (dataJSON && dataJSON._embedded && dataJSON._embedded.medicaments) {
      let medsBruts = dataJSON._embedded.medicaments;
      listeMedicaments.splice(0, listeMedicaments.length); // On vide la liste
      medsBruts.forEach((medJson) => {
        listeMedicaments.push(new Medicament(medJson)); // On la remplit avec les nouveaux
      });
      if (dataJSON.page) {
        totalPages.value = dataJSON.page.totalPages;
      }
    }
  });
}

// 2. SUPPRIMER
function handlerSupprimer(id) {
  supprimerMedicament(id).then(() => {
    chargerMedicaments();
  });
}

// 3. AJOUTER DU STOCK (+1)
function handlerAjouter(med) {
  modifierStockMedicament(med.id, med.quantiteStock + 1).then(() => {
    chargerMedicaments();
  });
}

// 4. RETIRER DU STOCK (-1)
function handlerRetirer(med) {
  if (med.quantiteStock > 0) {
    modifierStockMedicament(med.id, med.quantiteStock - 1).then(() => {
      chargerMedicaments();
    });
  }
}

// 5. AJOUTER UN NOUVEAU MÉDICAMENT
function handlerAjouterNouveau(med) {
  ajouterMedicament(med).then(() => {
    chargerMedicaments();
  });
}

// Au chargement de la page, on appelle l'API
onMounted(() => {
  chargerMedicaments();
});
</script>