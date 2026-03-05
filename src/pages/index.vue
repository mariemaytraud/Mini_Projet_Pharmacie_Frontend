
<script setup>
import { reactive, onMounted } from 'vue';
import { getMedicaments } from '@/service/APIservice.js';
import { Medicament } from '@/model/Medicament.js';
import MedicamentCard from '@/components/MedicamentCard.vue';

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

onMounted(() => {
  chargerMedicaments();
});
</script>

<template>
  <v-container>
    <h1 class="text-center MaPharmacie"> Ma Pharmacie</h1>

    <v-row>
      <v-col v-for="med in listeMedicaments" :key="med.id" cols="3">
        <MedicamentCard :medicament="med" />
      </v-col>
    </v-row>
  </v-container>
</template>

