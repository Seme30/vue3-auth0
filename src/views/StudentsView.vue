<template>

      <h1 class="students_header">Students</h1>
      <v-spacer></v-spacer>
  <v-card flat>
    <v-data-table
      :headers="headers"
      :items="students"
      :items-per-page="10"
      class="elevation-1 styled-table"
    >
    <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
          <td><a @click="goToDetailPage(item.id)">{{ item.firstName }}</a></td>
          <td><a @click="goToDetailPage(item.id)">{{ item.lastName }}</a></td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

  <script lang="ts">
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'StudentsView',
    setup() {
      const store = useStore();
  
      onMounted(async () => {
        await store.dispatch('fetchStudents');
      });

      const headers = [
            { title: 'Number', value: 'id', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
            { title: 'First Name', value: 'firstName', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
            { title: 'Last Name', value: 'lastName', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
          ];

    const goToDetailPage = (id: number) => {
      console.log(id);
      // router.push(`/business/${id}`);
    };
  
      const students = computed(() => store.state.students);
  
      return {
        students,
        headers,
        goToDetailPage
      };
    },
  };
  </script>
  

  <style scoped>

h1 {
  margin: 40px auto;
  font-weight: bold;
  text-align: center;
}

  .styled-table {
  width: 80%;
  margin: 0 auto;
  }
</style>