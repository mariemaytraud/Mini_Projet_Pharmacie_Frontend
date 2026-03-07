
<template>
  <v-table class="elevation-1 mt-5">
    <thead>
      <tr>
        <th class="text-left">Photo</th>
        <th class="text-left">Nom du médicament</th>
        <th class="text-left">Forme</th>
        <th class="text-center">Stock</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    
    <tbody>
      <tr v-for="med in medicaments" :key="med.id">
        <td>
          <v-img :src="med.photo" width="60" height="60" cover class="my-2 rounded"></v-img>
        </td>
        
        <td class="font-weight-bold">{{ med.nom }}</td>
        <td>{{ med.quantiteParUnite }}</td>
        
        <td class="text-center">
          <v-btn icon="mdi-minus" size="x-small" variant="tonal" color="orange" class="mr-2" @click="$emit('retirerStock', med)"></v-btn>
          <span class="text-subtitle-1 font-weight-bold">{{ med.quantiteStock }}</span>
          <v-btn icon="mdi-plus" size="x-small" variant="tonal" color="green" class="ml-2" @click="$emit('ajouterStock', med)"></v-btn>
        </td>
        
        <td class="text-center">
          <v-btn color="red" variant="flat" size="small" prepend-icon="mdi-delete" @click="$emit('supprimer', med.id)">
            Supprimer
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { Medicament } from '@/model/Medicament.js';
import TableauMedicaments from '@/components/TableauMedicaments.vue';
import { getMedicaments, ajouterMedicament, supprimerMedicament, modifierStockMedicament } from '@/service/APIservice.js';
import MedicamentFormulaire from '@/components/MedicamentFormulaire.vue';

const listeMedicaments = reactive([]);

// 1. RECHARGER LE TABLEAU
function chargerMedicaments() {
  getMedicaments().then((dataJSON) => {
    if (dataJSON && dataJSON._embedded && dataJSON._embedded.medicaments) {
      let medsBruts = dataJSON._embedded.medicaments;
      listeMedicaments.splice(0, listeMedicaments.length); // On vide la liste
      medsBruts.forEach((medJson) => {
        listeMedicaments.push(new Medicament(medJson)); // On la remplit avec les nouveaux
      });
    }
  });
}

// 2. SUPPRIMER
function handlerSupprimer(id) {
  // On passe bien juste l'ID !
  supprimerMedicament(id).then(() => {
    chargerMedicaments();
  });
}

// 3. AJOUTER DU STOCK (+1)
function handlerAjouter(med) {
  // On utilise PATCH avec l'ID et la nouvelle quantité
  modifierStockMedicament(med.id, med.quantiteStock + 1).then(() => {
    chargerMedicaments();
  });
}

// 4. RETIRER DU STOCK (-1)
function handlerRetirer(med) {
  // On vérifie qu'on ne descend pas en dessous de zéro
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