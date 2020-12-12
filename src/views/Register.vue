<template>
	<v-container fluid fill-height class="py-0 px-md-0">
		<v-row class="h-100" align="center">
			<v-col cols="12" lg="6" class="px-0 py-12">
				<v-card
					flat
					color="transparent"
					max-width="400"
					class="mx-auto tertiary--text"
				>
					<v-card-title
						class="display-1 font-weight-black justify-center py-4"
					>
						Goodbail
					</v-card-title>

					<v-card-text class="px-4 py-8 text-center">
						<v-alert v-model="alert" type="error" text dismissible>
							{{ alertText }}
						</v-alert>
						<v-form v-model="valid">
							<v-text-field
								v-model="form.firstname"
								label="Prénom *"
								required
								:rules="[(v) => !!v]"
								solo
								rounded
							></v-text-field>

							<v-text-field
								v-model="form.lastname"
								label="Nom *"
								required
								:rules="[(v) => !!v]"
								solo
								rounded
							></v-text-field>

							<v-text-field
								v-model="form.email"
								label="Adresse e-mail *"
								type="email"
								required
								:rules="[(v) => !!v]"
								solo
								rounded
							></v-text-field>

							<v-text-field
								v-model="form.password"
								label="Mot de passe *"
								:append-icon="
									showPassword ? 'mdi-eye' : 'mdi-eye-off'
								"
								@click:append="showPassword = !showPassword"
								:type="showPassword ? 'text' : 'password'"
								required
								:rules="[(v) => !!v]"
								solo
								rounded
							></v-text-field>

							<v-btn
								color="primary"
								rounded
								large
								min-width="100%"
								class="my-3"
								:disabled="!valid"
								@click="register"
								>C'est parti !</v-btn
							>
						</v-form>

						<div class="hr"></div>

						<p class="my-4">
							Vous avez déjà un compte ?
							<v-dialog max-width="500px">
								<template v-slot:activator="{ on }">
									<a v-on="on">Connexion</a>
								</template>
								<login-form></login-form>
							</v-dialog>
						</p>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="6" class="px-4 px-md-12 py-12 h-100 gradient-bg">
				<v-row align-lg="center" class="h-100">
					<v-col>
						<app-card class="my-auto">
							<h4 class="text-h4 text-center py-6 font-weight-bold">
								Comment ça marche ?
							</h4>
							<v-card-text class="px-2 px-md-10 py-6">
								<div class="d-flex flex-row">
									<v-icon class="align-start mr-3 primary--text"
										>mdi-checkbox-marked-circle</v-icon
									>
									<p class="mb-0">
										<b>Ouvrez votre compte Goodbail.</b> Votre
										email nous servira seulement d'identifiant
										pour votre compte, Aucun email publicitaire
										ne seront envoyé.
									</p>
								</div>
								<div class="hr"></div>
								<div class="d-flex flex-row">
									<v-icon class="align-start mr-3 primary--text"
										>mdi-checkbox-marked-circle</v-icon
									>
									<p class="mb-0">
										Enregistrez les informations concernant
										votre/vos bien(s) locatif(s).
									</p>
								</div>
								<div class="hr"></div>
								<div class="d-flex flex-row">
									<v-icon class="align-start mr-3 primary--text"
										>mdi-checkbox-marked-circle</v-icon
									>
									<p class="mb-0">
										Remplissez notre formulaire pour générer
										votre quittance de loyer au format PDF.
										<b
											>Pour les prochaines fois, votre
											document sera automatiquement rempli et
											daté.</b
										>
									</p>
								</div>
								<div class="hr"></div>
								<div class="d-flex flex-row">
									<v-icon class="align-start mr-3 primary--text"
										>mdi-checkbox-marked-circle</v-icon
									>
									<p>
										Vous n'aurez plus qu'à vous connecter et
										<b
											>générer votre quittance de loyer en 1
											clic.</b
										>
									</p>
								</div>
							</v-card-text>
						</app-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AppCard from '@/components/AppCard'
import LoginForm from '@/components/LoginForm'
import getFirebaseErrorMessage from '@/plugins/commonUtils'

export default {
	components: {
		AppCard,
		LoginForm,
	},

	data() {
		return {
			valid: true,
			alert: false,
			alertText: '',
			showPassword: false,

			form: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
			},
		}
	},

	methods: {
		register(e) {
			e.preventDefault()

			this.$store
				.dispatch('user/register', this.form)
				.then(() => {
					this.$router.push('/rentals').catch(() => {})
				})
				.catch((error) => {
					this.alertText = getFirebaseErrorMessage(error.code)
					this.alert = true
				})
		},
	},
}
</script>

<style scoped>
.d-flex p {
	font-size: 16px;
}
.h-100 {
	height: 100%;
}
.gradient-bg {
	background-image: linear-gradient(
		to right bottom,
		#00c58e,
		#00b995,
		#00ad98,
		#00a098,
		#009395
	);
}
.hr {
	margin-top: 3%;
	margin-bottom: 3%;
	border-bottom: 1px solid rgb(237, 237, 237);
	height: 1px;
}
</style>
