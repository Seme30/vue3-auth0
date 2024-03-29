<template>
    <h1 class="lessons_header">Lessons</h1>
    <v-spacer></v-spacer>
    <v-card flat>
      <v-data-table
        :headers="headers"
        :items="lessons"
        :items-per-page="10"
        class="elevation-1 styled-table"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td><a @click="goToDetailPage(item.id)">{{ item.name }}</a></td>
            <td>{{ item.startDate }}</td>
            <td>{{ item.endDate }}</td>
            <td>{{ item.students.length }}</td>
          </tr>
        </template>
      </v-data-table>
  
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <router-link to="/addlesson">
          <span class="add-lesson-link">Add Lesson</span>
        </router-link>
      </v-btn>
    </v-card>
  </template>
  
  <script lang="ts">
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'LessonsView',
    setup() {
      const store = useStore();
  
      onMounted(async () => {
        await store.dispatch('fetchLessons');
      });
  
      const headers = [
        { title: 'Number', value: 'id', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
        { title: 'Lesson Name', value: 'name', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
        { title: 'Start Date', value: 'startDate', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
        { title: 'End Date', value: 'endDate', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
        { title: 'Number of Students', value: 'students', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
      ];
  
      const goToDetailPage = (id: string) => {
        console.log(id);
      };
  
      const lessons = computed(() => store.state.lessons);
  
      return {
        lessons,
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
  
  button{
    margin: 20px 0px;
  }
  a{
    text-decoration: none;
  }
  
  .add-lesson-link {
    padding: 20px;
    color: white;
    font-weight: bold;
  }
  </style>
  