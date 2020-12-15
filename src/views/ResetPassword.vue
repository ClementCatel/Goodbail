<template>
	<v-container fluid fill-height class="py-0 px-md-0">
		<v-row justify="center">
			<v-col cols="12" sm="8" md="5" class="mt-8">
				<app-card>
					<h1 class="text-h5 text-center py-6 font-weight-bold">
						Entrez un nouveau mot de passe
					</h1>
					<v-card-text class="text-center px-0 px-sm-8">
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
								v-model="password"
								label="Entrez votre mot de passe"
								type="password"
								solo
								rounded
								required
							></v-text-field>
                            <v-text-field
								v-model="confirmedPassword"
								label="Confirmez votre mot de passe"
								type="password"
								solo
								rounded
								required
							></v-text-field>
							<v-btn
								x-large
								color="primary"
								rounded
								min-width="100%"
								:disabled="!password || !confirmedPassword"
								@click="resetPassword"
							>
								Changer votre mot de passe
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
            password: '',
            confirmedPassword: '',
            code: '',
		}
	},

	methods: {
		resetPassword() {
            if (this.$route.fullPath.includes('oobCode')) {
                this.code = this.$route.query.oobCode
            }

            if (this.password === this.confirmedPassword) {
                auth
                    .confirmPasswordReset(this.code, this.password)
                    .then(() => {
                        this.$router.push("/")
                    })
                    .catch(error => {
                        this.alertType = "error";
                        this.alertText = getFirebaseErrorMessage(error.code);
                        this.alertPassword = true;
                    });
            } else {
                this.alertType = "error";
                this.alertText = "Les mots de passe saisis ne sont pas identiques";
                this.alert = true;
            }
        }
	},
}
</script>
