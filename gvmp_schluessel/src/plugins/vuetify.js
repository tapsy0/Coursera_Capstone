import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import de from './locale/de.ts'

Vue.component('keymenu', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'de'
    },
  },
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { de },
    current: 'de',
  },
});
