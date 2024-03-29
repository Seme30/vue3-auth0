<template>
    <h2>Add Lessons Form</h2>
    <div class="addform">
      <v-card flat>
        <v-form @submit.prevent="onSubmit" style="height: 700px">

          <v-text-field v-model="lessonName" label="Lesson Name" required></v-text-field>

          <v-select
          v-if="studentsWithName"
            v-model="selectedStudents"
            :items="studentsWithName"
            item-title="title"
            item-value="id"
            multiple
            required
            label="Select Students"
        ></v-select>
        
        <VueDatePicker v-model="startDate" style="margin: 20px 0px" />
    
        <VueDatePicker v-model="endDate" style="margin: 20px 0px"/>
        
          <v-btn type="submit">Add Lesson</v-btn>
        </v-form>
      </v-card>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
  
  export default defineComponent({
    name: 'AddLessonsForm',
    components: { VueDatePicker },
    setup() {
      const lessonName = ref<string>('');
      const selectedStudents = ref<number[]>([]);
      const startDate = ref<Date>(new Date());
      const endDate = ref<Date>(new Date());

      const store = useStore();
  
      onMounted(async () => {
        await store.dispatch('fetchStudents');
      });

    const students = computed(() => store.state.students);

    const studentsWithName = computed(() => {
    return students.value.map((student: any) => ({
      id: student.id,
      title: `${student.firstName} ${student.lastName}`,
    }));
  });

      const onSubmit = () => {
        console.log(selectedStudents.value)
        const lesson = {
          name: lessonName.value,
          students: selectedStudents.value,
          startDate: startDate.value.toISOString(),
          endDate: endDate.value.toISOString(),
        };
  
        store.dispatch('createLesson', lesson);
      };

  
      return {
        lessonName,
        selectedStudents,
        studentsWithName,
        startDate,
        endDate,
        students,
        onSubmit,
      };
    },
  });
  </script>
  
  <style scoped>
    h2 {
      margin: 20px auto;
      text-align: center;
    }
    .addform {
      max-width: 500px;
      margin: 30px auto;
    }
  </style>
  