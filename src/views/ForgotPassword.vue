<template> 
	<v-container fluid fill-height class="py-0 px-md-0">
		<v-row justify="center">
			<v-col cols="11" md="5">
				<app-card>
					<v-card-title class="justify-center font-weight-bold">
						Vous avez oublié votre mot de passe ?
					</v-card-title>
					<v-card-text class="text-center">
						<p class="px-6 pb-6">
							Vous allez recevoir un email avec un lien valable 24h. Cliquez dessus et choisissez votre nouveau mot de passe !
						</p>
						<form >
							<v-text-field
								v-model="email"
								label="Adresse e-mail"
								type="email"
								solo
								rounded
								required
							></v-text-field>
							<v-btn x-large color="primary" rounded min-width="100%" :disabled="!email">
								Réinitialiser mon mot de passe
							</v-btn>
						</form>
					</v-card-text>
				</app-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AppCard from "@/components/AppCard"

export default {
	components: {
		AppCard
	},

	data() {
		return {
			email: '',
			error: null,
			emailSending: false,
		}
	},

	methods: {
		sendEmail() {
			if (!this.email) {
				this.error = 'Veuillez saisir une adresse email valide.'
				return
			}
			this.error = null
			this.emailSending = true
			firebase
				.auth()
				.sendPasswordResetEmail(this.email)
				.then(() => {
					this.emailSending = false
				})
				.catch((error) => {
					this.emailSending = false
					this.error = error.message
				})
		},
	},
}
</script>

<style></style>
