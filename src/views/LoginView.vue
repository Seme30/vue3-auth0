<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-row>
        <v-col cols="12"  offset-sm="2" md="6" offset-md="3" lg="4" offset-lg="4">
          <br><br>
          <h3 class="headline mb-0">Welcome</h3>
          <br><br>
          <v-card 
           title="Welcome to My Application."
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                "
            variant="tonal" style="margin-bottom:200px;">
            <v-card-title primary-title>
              
            </v-card-title>
            <v-card-actions style="margin: auto;">
              <v-btn  @click="auth0Login()">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
    name: "LoginView",
    setup(){
        const auth0Login = () => {
         store.dispatch('auth0Login')
        }
        return {
            auth0Login
        }
    }
    }
)
</script>