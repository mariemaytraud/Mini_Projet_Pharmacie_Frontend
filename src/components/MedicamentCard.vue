<template>
  <v-card width="250">
    <v-img :src="medicament.photo" height="150"></v-img>

    <v-card-title>{{ medicament.nom }}</v-card-title>
    <v-card-subtitle>{{ medicament.quantiteParUnite }}</v-card-subtitle>

    <v-card-text>
      <p>Stock : {{ medicament.quantiteStock }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="red">Supprimer</v-btn>
      <v-btn color="blue">Modifier</v-btn>
      <v-btn color="green">+1</v-btn>
      <v-btn color="orange">-1</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

const props = defineProps(["medicament"]);
</script>