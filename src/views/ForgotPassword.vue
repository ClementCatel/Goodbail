<template>
	<v-container fluid fill-height class="py-0 px-md-0">
		<v-row justify="center">
			<v-col cols="12" sm="8" md="5" class="mt-8">
				<app-card>
					<h1 class="text-h5 text-center py-6 font-weight-bold">
						Vous avez oublié votre mot de passe ?
					</h1>
					<v-card-text class="text-center px-0 px-sm-8">
						<p class="px-sm-6 pb-6">
							Vous allez recevoir un e-mail avec un lien valable
							24h. Cliquez dessus et choisissez votre nouveau mot
							de passe !
						</p>
						<form>
							<v-alert
								v-model="alert"
								:type="alertType"
								text
								dismissible
							>
								{{ alertText }}
							</v-alert>
							<v-text-field
								v-model="email"
								label="Adresse e-mail"
								type="email"
								solo
								rounded
								required
							></v-text-field>
							<v-btn
								x-large
								color="primary"
								rounded
								min-width="100%"
								:disabled="!email"
								@click="sendEmail"
							>
								Réinitialiser mot de passe
							</v-btn>
						</form>
					</v-card-text>
				</app-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AppCard from '@/components/AppCard'
import { auth } from '@/services/firebase'
import getFirebaseErrorMessage from '@/plugins/commonUtils'

export default {
	components: {
		AppCard,
	},

	data() {
		return {
			valid: true,
			alert: false,
			alertType: 'error',
			alertText: '',
			email: '',
		}
	},

	methods: {
		sendEmail() {
			this.$store.commit('SET_LOADING', true)
			auth.sendPasswordResetEmail(this.email)
				.then(() => {
					this.$store.commit('SET_LOADING', false)
					this.alertText =
						"Un e-mail vous a été envoyé à l'adresse " +
						this.email +
						'. Suivez le lien fourni pour réinitialiser votre mot de passe.'
					this.alertType = 'success'
					this.alert = true
				})
				.catch((error) => {
					this.$store.commit('SET_LOADING', false)
					this.alertText = getFirebaseErrorMessage(error.code)
					this.alert = true
				})
		},
	},
}
</script>

<style></style>
