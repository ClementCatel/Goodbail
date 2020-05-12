<template>
  <v-row>
    <v-col cols="12" md="5" class="mx-auto">
      <receipt-form @generate="generatePdf"></receipt-form>
    </v-col>
  </v-row>
</template>

<script>
import jsPDF from "jspdf";
import { NewYorkFont } from "../assets/fonts/new-york";
import numberToLetter from "@/plugins/numberToLetter";
import ReceiptForm from "@/components/ReceiptForm";
import store from "@/store";
import { mapState } from "vuex";

export default {
  components: {
    ReceiptForm
  },

  computed: mapState({
    rental: state => state.rentals.rental
  }),

  methods: {
    fullAdress() {
      return (
        this.rental.adress + " " + this.rental.postcode + " " + this.rental.city
      );
    },

    tenants() {
      let tenants = "";
      const array = this.rental.tenants;

      for (let index = 0; index < array.length; index++) {
        if (index == array.length - 1 && index > 0) tenants += " et ";
        tenants += this.rental.tenants[index].civility;
        tenants += " ";
        tenants += this.rental.tenants[index].name;
      }

      return tenants;
    },

    mainParagraph(payload) {
      return [
        "Je soussigné " +
          payload.denomination +
          " propriétaire du logement désigné ci-dessus,",
        "déclare avoir reçu de " + this.tenants(),
        "la somme de " +
          numberToLetter(
            parseInt(this.rental.rent) + parseInt(this.rental.charges)
          ) +
          " euros",
        "au titre du paiement du loyer et des charges pour la période de location",
        "Du 01 au " + payload.date2Fr,
        "et lui en donne quittance, sous réserve de tous mes droits."
      ];
    },

    summary(date) {
      return [
        "Détail du règlement :",
        "Loyer : " + this.rental.rent + " euros",
        "Provision pour charges : " + this.rental.charges + " euros",
        "Total : " +
          (parseInt(this.rental.rent) + parseInt(this.rental.charges)) +
          " euros",
        "Date du paiement : le " + date
      ];
    },

    generatePdf(payload) {
      const todaysDate = new Date().toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      var doc = new jsPDF();
      doc.addFileToVFS("new-york.ttf", NewYorkFont);
      doc.addFont("new-york.ttf", "new-york", "normal");

      doc.setFontStyle("bold");
      doc.text("QUITTANCE DE LOYER", 105, 30, null, null, "center");
      doc.text(
        payload.date2Fr.substring(3).toUpperCase(),
        105,
        40,
        null,
        null,
        "center"
      );

      doc.setFontSize(12);
      doc.setFontStyle("normal");
      doc.text(
        "Adresse de la location :  " + this.fullAdress(),
        105,
        60,
        null,
        null,
        "center"
      );
      doc.text(this.mainParagraph(payload), 20, 80);
      doc.text(this.summary(payload.date3Fr), 20, 120);
      doc.text("Fait à " + payload.city + " le " + todaysDate, 20, 160);

      doc.setFont("new-york");
      doc.setFontSize(48);
      doc.text(payload.signature, 20, 180);

      doc.setFont("helvetica");
      doc.setFontSize(10);
      doc.text(
        "From good-bail.com",
        105,
        doc.internal.pageSize.height - 10,
        null,
        null,
        "center"
      );

      doc.save(
        "QUITTANCE " + payload.date2Fr.substring(3).toUpperCase() + ".pdf"
      );
    }
  },

  async beforeRouteEnter(to, from, next) {
    await store.dispatch("rentals/getRentalById", to.params.id);
    next();
  }
};
</script>
