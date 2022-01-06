<template>
    <div class="px-8 py-4 text-2">
        <h2 class="text-xl">
            Profil
        </h2>
        <p class="text-sm mb-6">
            Vos informations personnelles publiques
        </p>
        <div>
            <div>
                <div class="flex mb-4">
                    <div class="mr-6 w-full">
                        <div class="flex mb-4">
                            <div class="mr-2 w-1/2">
                                <label
                                    for="firstname"
                                    class="text-lg"
                                >Prénom</label>
                                <input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    class="w-full input bg-1"
                                >
                            </div>
                            <div class="ml-2 w-1/2">
                                <label
                                    for="lastname"
                                    class="text-lg"
                                >Nom</label>
                                <input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    class="w-full input bg-1"
                                >
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <label
                                for="description"
                                class="text-lg"
                            >Description</label>
                            <textarea
                                id="description"
                                name="description"
                                class="input"
                            />
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="relative">
                            <img
                                src="@/assets/img/default_avatars/user.png"
                                alt="img"
                                class="rounded-full h-48 w-48"
                            >
                            <i class="ri-camera-line text-2xl border rounded-full py-1 px-2 bg-2 border-color-2 absolute bottom-0 right-2" />
                        </div>
                    </div>
                </div>
                <div class="flex mb-4 space-x-4">
                    <div class="flex flex-col">
                        <label
                            for="parcours"
                            class="text-lg w-full"
                        >Parcours</label>
                        <SelectInput
                            v-model="parcours"
                            :choices="['Parcours Ingénieur','Parcours Expert (PEx)']"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label
                            for="promo"
                            class="text-lg w-full"
                        >Promotion</label>
                        <SelectInput
                            v-model="promotion"
                            :choices="['L1','L2','L3','M1','M2']"
                        />
                    </div>
                    <div class="w-40">
                        <label
                            for="td"
                            class="text-lg"
                        >Groupe de TD</label>
                        <SelectInput
                            v-model="promotion"
                            :choices="['Int1','Int2','Int3','Int4','A','B','C','D','E','F','G','BN','BDX']"
                        />
                    </div>
                </div>
                <div class="mb-4">
                    <div class="text-lg">
                        Associations
                    </div>

                    <div
                        v-for="(asso, idx) in assos"
                        :key="idx"
                        class="flex mb-2 items-center"
                    >
                        <div class="mr-2">
                            <SelectInput
                                v-model="assos[idx]"

                                button-name="Association"
                                :choices="['Horizon','BDS','...']"
                            />
                        </div>
                        <div class="ml-2">
                            <SelectInput
                                v-model="roles[idx]"
                                button-name="Role"
                                :choices="['Membre','Président','Secretaire']"
                            />
                        </div>
                        <button
                            v-if="idx > 0"
                            class="text-1 text-xl red-500 h-8 w-8"
                            @click="rmLineAsso()"
                        >
                            <i class="ri-close-line" />
                        </button>
                    </div>
                    <button
                        class="button my-2"
                        @click="addLineAsso()"
                    >
                        <p>Ajouter une Association</p>
                    </button>
                </div>
                <div class="mb-4 w-96">
                    <div class="text-lg">
                        Comptes Externes
                    </div>
                    <div
                        v-for="(account, idx) in accounts"
                        :key="idx"
                        class="flex justify-between mb-2 items-center"
                    >
                        <div class="flex">
                            <i
                                v-if="accounts[idx] != null"
                                :class="accountsList[Object.keys(accountsList)[accounts[idx]]]"
                                class="mr-2 my-auto"
                            />
                            <SelectInput
                                v-model="accounts[idx]"
                                :choices="Object.keys(accountsList)"
                            />
                        </div>
                        <input
                            class="input ml-2"
                            placeholder="Compte"
                        >
                    </div>
                    <button
                        class="
                            button
                            my-2"
                        @click="addLineAccount()"
                    >
                        <p>Ajouter un compte externe</p>
                    </button>
                </div>
                <button class="button mb-4">
                    <p>Enregistrer</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import SelectInput from '@/components/Input/SelectInput.vue'
export default {
    components: { SelectInput },
    data() {
        return {
            assos: [null],
            roles: [null],
            parcours: null,
            promotion: null,
            group: null,
            accounts: [null],
            accountsList: {
                Mail:'ri-mail-line',
                LinkedIn:'ri-linkedin-fill',
                Discord:'ri-discord-fill',
                Instagram:'ri-instagram-fill',
                GitHub:'ri-github-fill'
            }
        };
    },
    methods: {
        addLineAsso: function addLineAsso() {
            this.assos.push(null);
            this.roles.push(null);
        },
        rmLineAsso: function rmLineAsso() {
            this.assos.pop();
            this.roles.pop();
        },
        addLineAccount: function addLineAccount() {
            this.accounts.push(null);
        },
        rmLineAccount: function rmLineAccount() {
            this.accounts.pop();
        }
    }
}
</script>
