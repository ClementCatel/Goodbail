import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#00c58e",
        secondary: colors.blue.darken4,
        tertiary: "#1D1148",
        background: "#f8f9fe"
      }
    }
  }
});
