<template>
    <div>
        finalizing authentication....
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import store from '@/store';

    export default defineComponent({
        name: "Auth0CallBack",
        setup(){
            store.dispatch('auth0HandleAuthentication')
        }
    })
</script>