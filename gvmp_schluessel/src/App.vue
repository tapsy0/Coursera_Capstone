<template>
  <v-app>
    <v-content>
      <keymenu/>
    </v-content>
  </v-app>
</template>

<script>
import keymenu from './components/keymenu.vue';

export default {
  name: 'App',
  components: {
    keymenu,
  },
  data: () => ({
    //
  }),
};
</script>
