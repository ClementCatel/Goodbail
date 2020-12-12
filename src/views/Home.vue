<template>
	<v-container fluid fill-height class="py-0 px-md-0">
		<v-row align="center" justify="center">
			<v-col
				cols="12"
				sm="10"
				md="8"
				lg="4"
				xl="3"
				class="text-center text-lg-left px-md-0"
			>
				<h1 class="font-weight-black my-8 text-h3">
					Vos quittances de loyer en un clic
				</h1>
				<p class="font-weight-bold mb-8">
					Laissez-vous guider pas à pas par notre formulaire. Vos
					quittances de loyer seront automatiquement remplies et
					datées. Vous téléchargez un PDF prêt à envoyer.
				</p>
				<v-btn
					color="primary"
					rounded
					x-large
					class="text-h6 font-weight-regular shadow"
					to="/register"
				>
					Ouvrir un compte
					<span class="pl-1 sub-text">— C'est gratuit</span>
				</v-btn>
			</v-col>

			<v-col cols="12" sm="10" md="8" lg="4" xl="3" class="pa-md-0">
				<v-slide-x-reverse-transition>
					<v-img
						v-if="visualHeader"
						src="@/assets/img/quittance-de-loyer.png"
						class="ml-md-5"
					></v-img>
				</v-slide-x-reverse-transition>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

export default {
	data() {
		return {
			visualHeader: false,
		}
	},

	mounted() {
		this.visualHeader = true
	},
}
</script>

<style scoped>
.height {
	min-height: 700px;
}
.sub-text {
	opacity: 0.8;
	font-weight: 300;
}
h1 {
	line-height: 1.2 !important;
}
</style>
