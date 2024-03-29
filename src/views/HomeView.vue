<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>Total Students</v-card-title>
          <v-card-text>{{ students.length }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title>Total Lessons</v-card-title>
          <v-card-text>{{ lessons.length }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Students per Lesson</v-card-title>
          <v-list>
            <v-list-item v-for="lesson in lessons" :key="lesson.id">
              <v-list-item-title>{{ lesson.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ lesson.students.length }} students</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",
  setup(){

    const store = useStore();
  
      onMounted(async () => {
        await store.dispatch('fetchLessons');
        await store.dispatch('fetchStudents')
      });

      const lessons = computed(() => store.state.lessons);

      const students = computed(() => store.state.students);


      return {
        lessons,
        students
      }

  }
});
</script>
