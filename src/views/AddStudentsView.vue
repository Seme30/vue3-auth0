<template>
    <h2>Add Student Form</h2>
    <div class="addform">
        <v-card flat>
            <v-form @submit.prevent="onSubmit">
      <v-text-field v-model="firstName" label="First Name" required></v-text-field>
      <v-text-field v-model="lastName" label="Last Name" required></v-text-field>
      <v-btn type="submit">Add Student</v-btn>
    </v-form>
        </v-card>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_STUDENT } from '@/graphql/queries';
import store from '@/store';

export default defineComponent({
  name: "Add Students Form",
  setup() {
    const firstName = ref<string>('')
    const lastName = ref<string>('')

    return {
      firstName,
      lastName,
      onSubmit() {
        store.dispatch('createStudent', { firstName: firstName.value, lastName: lastName.value });
      },
    };
  }
})

  </script>

  <style scoped>
    h2{
        margin: 20px auto;
        text-align: center;
    }
    .addform{
        max-width: 500px;
        margin: 30px auto;
    }    
</style>
  