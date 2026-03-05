<template>
    <v-card>
        <v-card-title>Nouveau médicament</v-card-title>
       
        <v-form @submit.prevent="ajouter">
            <v-text-field v-model="nom" label="Nom"></v-text-field>
            <v-text-field v-model="forme" label="Forme (ex: Gélules)"></v-text-field>
            <v-text-field v-model="stock" label="Stock" type="number"></v-text-field>
            <v-text-field v-model="photo" label="Lien photo"></v-text-field>
        
        <v-btn type="submit" color="blue">Ajouter</v-btn>
    
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const nom = ref("");
const forme = ref("");
const stock = ref(0);
const photo = ref("");

const emit = defineEmits(["addMed"]);

function ajouter() {
    const nouveauMedicament = {
        nom: nom.value,
        quantiteParUnite: forme.value,
        quantiteStock: stock.value,
        imageURL: photo.value
    };

    emit("addMed", nouveauMedicament);

    nom.value = "";
    forme.value = "";
    stock.value = 0;
    photo.value = "";
}
</script>

