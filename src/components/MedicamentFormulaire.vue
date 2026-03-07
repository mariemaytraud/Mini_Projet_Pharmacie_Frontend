<template>
  <v-dialog max-width="500">
    
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="blue"
        prepend-icon="mdi-plus"
        class="mb-4"
      >
        Nouveau Médicament
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Ajouter un médicament">
        <v-card-text>
          <v-form @submit.prevent="ajouter(isActive)">
            <v-text-field v-model="nom" label="Nom" variant="outlined" class="mb-2"></v-text-field>
            <v-text-field v-model="forme" label="Forme (ex: Gélules)" variant="outlined" class="mb-2"></v-text-field>
            <v-text-field v-model="stock" label="Stock" type="number" variant="outlined" class="mb-2"></v-text-field>
            <v-text-field v-model="photo" label="Lien photo" variant="outlined"></v-text-field>
            
            <v-card-actions>
              <v-spacer></v-spacer> <v-btn text="Annuler" variant="plain" @click="isActive.value = false"></v-btn>
              <v-btn color="blue" type="submit" variant="flat">Ajouter</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
    
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const nom = ref("");
const forme = ref("");
const stock = ref(0);
const photo = ref("");

const emit = defineEmits(["addMed"]);

//reçoit "isActive" depuis le HTML pour pouvoir ordonner la fermeture
function ajouter(isActive) {
  const nouveauMedicament = {
    nom: nom.value,
    quantiteParUnite: forme.value,
    unitesEnStock: parseInt(stock.value),
    photo: photo.value
  };

  //envoie au parent
  emit("addMed", nouveauMedicament);

  //vide les champs
  nom.value = "";
  forme.value = "";
  stock.value = 0;
  photo.value = "";
  
  //ferme la popup automatiquement
  isActive.value = false;
}
</script>