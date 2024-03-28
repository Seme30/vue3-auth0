import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import { MutationTree, ActionTree } from 'vuex';

// Define GraphQL query
const GET_STUDENTS = gql`
query {
  students {
    id
    firstName
    lastName
  }
}`;

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

interface State {
  students: Student[];
}

interface Mutations {
  setStudents: (state: State, students: Student[]) => void;
}

const mutations: MutationTree<State> & Mutations = {
  setStudents(state, students) {
    state.students = students;
  },
};

interface Actions {
  fetchStudents: (context: { commit: (key: keyof Mutations, payload: any) => void }) => Promise<void>;
}

const actions: ActionTree<State, State> & Actions = {
  async fetchStudents({ commit }) {
    const { result } = useQuery(GET_STUDENTS);
    const { data, loading, error } = result.value;

    if (!loading && !error) {
      commit('setStudents', data.students);
    }
  },
};

export default {
  state: () => ({
    students: [],
  }),
  mutations,
  actions,
};
