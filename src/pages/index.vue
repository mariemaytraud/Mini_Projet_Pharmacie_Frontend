<template>
  <v-container>
    <h1 class="text-center MaPharmacie mb-5"> Ma Pharmacie</h1>

    <MedicamentFormulaire @addMed="handlerAjouterNouveau" />
    <v-text-field
      v-model="recherche"
      label="Rechercher un médicament sur cette page"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      clearable
      class="mt-4 mb-4"
    ></v-text-field>

    <TableauMedicaments 
      :medicaments="listeFiltree" 
      @supprimer="handlerSupprimer" 
      @ajouterStock="handlerAjouter" 
      @retirerStock="handlerRetirer"
      @editer="ouvrirEdition"
    />

    <div class="text-center mt-4">
      <v-pagination
        v-model="pageCourante"
        :length="totalPages"
        @update:modelValue="chargerMedicaments"
        color="blue"
      ></v-pagination>
    </div>

    <v-dialog v-model="dialogEdition" max-width="500">
      <v-card title="Modifier le médicament">
        <v-card-text>
          <v-text-field v-model="medEdition.nom" label="Nom" variant="outlined" class="mb-2"></v-text-field>
          <v-text-field v-model="medEdition.forme" label="Forme" variant="outlined" class="mb-2"></v-text-field>
          <v-text-field v-model="medEdition.stock" label="Stock" type="number" variant="outlined" class="mb-2"></v-text-field>
          <v-text-field v-model="medEdition.photo" label="Lien photo" variant="outlined" class="mb-2"></v-text-field>
          
          <v-select v-model="medEdition.categorieId" :items="listeCategories" item-title="nom" item-value="id" label="Catégorie" variant="outlined"></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Annuler" variant="plain" @click="dialogEdition = false"></v-btn>
          <v-btn color="orange" variant="flat" @click="sauvegarderModification">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>

import { reactive, onMounted, ref, computed } from 'vue';
import { Medicament } from '@/model/Medicament.js';
import TableauMedicaments from '@/components/TableauMedicaments.vue';
import MedicamentFormulaire from '@/components/MedicamentFormulaire.vue';
import { getMedicaments, ajouterMedicament, supprimerMedicament, modifierStockMedicament, modifierMedicamentComplet } from '@/service/APIservice.js';

const listeMedicaments = reactive([]);

const pageCourante = ref(1); 
const totalPages = ref(1);
const recherche = ref("");

const listeFiltree = computed(() => {
  // Si la barre est vide, on affiche tous les médicaments de la page
  if (!recherche.value) {
    return listeMedicaments;
  }
  // Sinon, on garde seulement ceux dont le nom contient les lettres tapées (en ignorant les majuscules/minuscules)
  return listeMedicaments.filter(med => 
    med.nom.toLowerCase().includes(recherche.value.toLowerCase())
  );
});

const dialogEdition = ref(false);
const listeCategories = ref([]);
const medEdition = reactive({ id: null, nom: "", forme: "", stock: 0, photo: "", categorieId: 1 });
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

function chargerCategories() {
  fetch("https://projet-pharmacie-maytraud.onrender.com/api/categories")
    .then(res => res.json())
    .then(data => {
      if (data && data._embedded && data._embedded.categories) {
        listeCategories.value = data._embedded.categories.map(cat => {
          let url = cat._links.self.href.split('{')[0];
          let urlCoupee = url.split('/');
          return { id: urlCoupee[urlCoupee.length - 1], nom: cat.libelle || cat.nom || cat.code || "Catégorie" };
        });
      }
    });
}
// 2. SUPPRIMER
function handlerSupprimer(id) {
  supprimerMedicament(id).then(() => {
    chargerMedicaments();
  });
}
// Variable pour stocker le médicament à modifier
const medicamentEnCoursEdition = ref(null);


function ouvrirEdition(med) {
  medEdition.id = med.id;
  medEdition.nom = med.nom;
  medEdition.forme = med.quantiteParUnite;
  medEdition.stock = med.quantiteStock;
  medEdition.photo = med.photo; 
 dialogEdition.value = true; // Ouvre la popup
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

// La fonction manquante pour enregistrer la modification !
function sauvegarderModification() {
  modifierMedicamentComplet(
    medEdition.id, 
    medEdition.nom, 
    medEdition.forme, 
    medEdition.stock, 
    medEdition.photo, 
    medEdition.categorieId
  ).then(() => {
    dialogEdition.value = false; // Ferme la popup
    chargerMedicaments();        // Met à jour le tableau
  });
}

// Au chargement de la page, on appelle l'API pour les médicaments ET les catégories
onMounted(() => {
  chargerMedicaments();
  chargerCategories(); 
});
</script>