import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green.accent2,
        secondary: colors.blue.darken4,
        background: "#f8f9fe"
      }
    }
  }
});
