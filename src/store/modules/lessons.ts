import { Ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import { MutationTree, ActionTree } from 'vuex';


const GET_LESSONS = gql`
query {
    lessons {
      id
      name
      startDate
      endDate
      students{
        id
        firstName
        lastName
      }
    }
  }
`;

export interface Lesson {
  id: string;
  name: string;
}


interface State {
  lessons: Lesson[];
}

interface Mutations {
  setLessons: (state: State, lessons: Lesson[]) => void;
}

const mutations: MutationTree<State> & Mutations = {
  setLessons(state, lessons) {
    state.lessons = lessons;
  },
};

interface Actions {
  fetchLessons: (context: { commit: (key: keyof Mutations, payload: any) => void }) => Promise<void>;
}

const actions: ActionTree<State, State> & Actions = {
  async fetchLessons({ commit }) {
    const { result } = useQuery(GET_LESSONS);
    const { data, loading, error } = result.value;

    if (!loading && !error) {
      commit('setLessons', data.lessons);
    }
  },
};

export default {
  state: () => ({
    lessons: [],
  }),
  mutations,
  actions,
};
