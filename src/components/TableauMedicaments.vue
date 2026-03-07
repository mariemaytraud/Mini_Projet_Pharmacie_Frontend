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

// reçoit une liste en paramètre
defineProps({
  medicaments: {
    type: Array,
    required: true
  }
});

defineEmits(['supprimer', 'ajouterStock', 'retirerStock']);
</script>