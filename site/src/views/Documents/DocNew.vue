<template>
    <div class="w-21/24 my-8 mx-auto shadow-md card">
        <MultiStepForm
            v-model="stepAction"
            :steps="steps"
            @previous-step="previousStep"
            @next-step="nextStep"
            @finish="submitForm"
        >
            <template #step1>
                <section>
                    <div class="text-xl py-2">
                        Etape 1
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label for="matiere">Matière</label>
                            <input
                                id="matiere"
                                v-model="stepsModel[0].docSubject"
                                class="input w-full"
                                type="text"
                                placeholder="Quelle est la matière du document"
                                @input="test"
                            >
                        </div>

                        <div>
                            <label for="filiere">Filière</label>
                            <input
                                id="filiere"
                                v-model="stepsModel[0].filiere"
                                class="input w-full"
                                type="text"
                                placeholder="Quelle est la filière associé à ce document"
                            >
                        </div>

                        <div class="flex flex-col">
                            <label for="doc-type">Type de document</label>
                            <SelectInput
                                v-model="stepsModel[0].docType"
                                :choices="['DE', 'CE', 'TD', 'Fiche', 'Projet/TAI', 'Interrogation de TD',
                                           'Cours Efrei', 'Cours eProf', 'DM', 'Notes de cours']"
                            />
                        </div>
                        <div class="flex flex-col">
                            <label for="content">Contenu du dépôt</label>
                            <SelectInput
                                v-model="stepsModel[0].docContent"
                                :choices="['Choix', 'Corrigé', 'Sujet + Corrigé', 'Copie d\'étudiant']"
                            />
                        </div>
                        <div>
                            <label for="promo">Année du document (Promo)</label>
                            <input
                                id="promo"
                                v-model="stepsModel[0].docYear"
                                type="number"
                                placeholder="2025"
                                class="input w-full"
                            >
                        </div>
                    </div>

                    <FileInput
                        v-model="stepsModel[0].files"
                        :img-preview="true"
                        :file-limit="0"
                        class="h-52 w-full mt-4"
                    />
                </section>
            </template>

            <template #step2>
                <section
                    class="space-y-2"
                >
                    <div class="text-xl py-2">
                        Etape 2
                    </div>
                    <input
                        v-model="stepsModel[1].docName"
                        class="input w-full"
                        type="text"
                        placeholder="Complément du nom"
                    >
                    <h4>Description du document </h4>
                    <textarea
                        v-model="stepsModel[1].docDescription"
                        placeholder="Description du document"
                        class="input w-full leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                    />
                </section>
            </template>

            <template #step3>
                <section>
                    <div class="text-xl py-2">
                        Etape 3
                    </div>
                    <p>Disclaimer:</p>
                    <ul class="list-disc">
                        <li>Si vous uploadez un fichier, il sera public et accessible par tous</li>
                        <li>Si vous souhaitez que des informations soient floutées, corrigées ou généralement modifiées, nous vous ferrons une proposition avec des informations sensibles retirées et attendrons votre confirmation avant de rendre le fichier public</li>
                    </ul>
                    <p class="mt-2">
                        Êtes-vous d'accord ?
                    </p>

                    <label>
                        <input
                            v-model="stepsModel[2].modifyDoc"
                            name="radioFile"
                            value="true"
                            type="radio"
                            class="ml-5"
                        >Oui
                    </label>

                    <label>
                        <input
                            v-model="stepsModel[2].modifyDoc"
                            name="radioFile"
                            value="false"
                            type="radio"
                            class="ml-5"
                        >Non
                    </label>
                </section>
            </template>
        </MultiStepForm>
    </div>
    <!-- <div class="w-21/24 my-8 mx-auto shadow-md card">
        <div
            class="mx-4 p-10"
        >
            <div class="flex items-center">
                <div class="flex items-center text-sky-600 relative">
                    <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 border-sky-600 flex items-center justify-center">
                        <i class="ri-bookmark-line ri-lg" />
                    </div>
                    <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-sky-600">
                        Informations principales
                    </div>
                </div>
                <div
                    class="flex-auto border-t-2 transition duration-500 ease-in-out "
                    :class="[step >= 2 ? 'border-sky-600':'border-gray-300']"
                />
                <div
                    class="flex items-center  relative"
                    :class="[step >= 2 ? 'text-sky-600' : 'text-gray-500']"
                >
                    <div
                        class="rounded-full transition duration-500 ease-in-out h-12 w-12 border-2  flex items-center justify-center"
                        :class="[step >= 2 ? 'border-sky-600':'border-gray-300']"
                    >
                        <i class="ri-user-add-line" />
                    </div>
                    <div
                        class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
                        :class="[step >= 2 ? 'text-sky-600' : 'text-gray-500']"
                    >
                        Infos complémentaires
                    </div>
                </div>
                <div
                    class="flex-auto border-t-2 transition duration-500 ease-in-out"
                    :class="[step == 3 ? 'border-sky-600' : 'border-gray-300']"
                />
                <div
                    class="flex items-center  relative"
                    :class="[step == 3 ? 'text-sky-600' : 'text-gray-500']"
                >
                    <div
                        class="rounded-full transition duration-500 ease-in-out h-12 w-12 border-2  flex items-center justify-center"
                        :class="[step == 3 ? 'border-sky-600' : 'border-gray-300']"
                    >
                        <i class="ri-mail-send-line" />
                    </div>
                    <div
                        class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
                        :class="[step == 3 ? 'text-sky-600' : 'text-gray-500']"
                    >
                        Finalisation
                    </div>
                </div>
            </div>
        </div>
        <form
            id="FileUpload"
            class="px-20 py-8 mb-4"
        >
            <section
                v-if="step == 1"
            >
                <div class="text-xl py-2">
                    Etape 1
                </div>
                <div class="space-y-4">
                    <div>
                        <label for="matiere">Matière</label>
                        <input
                            id="matiere"
                            class="input w-full"
                            type="text"
                            placeholder="Quelle est la matière du document"
                        >
                    </div>

                    <div>
                        <label for="filiere">Filière</label>
                        <input
                            id="filiere"
                            class="input w-full"
                            type="text"
                            placeholder="Quelle est la filière associé à ce document"
                        >
                    </div>

                    <div>
                        <label for="doc-type">Type de document</label>
                        <select
                            id="doc-type"
                            class="input w-full"
                        >
                            <option value="DE">
                                DE
                            </option>
                            <option value="CE">
                                CE
                            </option>
                            <option value="TD">
                                TD
                            </option>
                            <option value="Fiche">
                                Fiche
                            </option>
                            <option value="Projet/TAI">
                                Projet/TAI
                            </option>
                            <option value="Interro de TD">
                                Interro de TD
                            </option>
                            <option value="Cours Efrei">
                                Cours Efrei
                            </option>
                            <option value="Cours d'eProf">
                                Cours d'eProf
                            </option>
                            <option value="DM">
                                DM
                            </option>
                            <option value="Notes de cours">
                                Notes de cours
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="content">Contenu du dépôt</label>
                        <select
                            id="content"
                            class="input w-full"
                        >
                            <option value="Sujet">
                                Sujet
                            </option>
                            <option value="Corrigé">
                                Corrigé
                            </option>
                            <option value="Sujet + Corrigé">
                                Sujet + Corrigé
                            </option>
                            <option value="Copie d'étudiant">
                                Copie d'étudiant
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="promo">Année du document (Promo)</label>
                        <input
                            id="promo"
                            type="number"
                            placeholder="2025"
                            class="input w-full"
                        >
                    </div>
                </div>

                <FileInput />
            </section>
            <section
                v-if="step == 2"
                class="space-y-2"
            >
                <div class="text-xl py-2">
                    Etape 2
                </div>
                <input
                    class="input w-full"
                    type="text"
                    placeholder="Complément du nom"
                >
                <h4>Description du document </h4>
                <textarea
                    placeholder="Description du document"
                    class="input w-full leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                />
            </section>
            <section v-if="step == 3">
                <div class="text-xl py-2">
                    Etape 3
                </div>
                <p>Disclaimer:</p>
                <ul class="list-disc">
                    <li>Si vous uploadez un fichier, il sera public et accessible par tous</li>
                    <li>Si vous souhaitez que des informations soient floutées, corrigées ou généralement modifiées, nous vous ferrons une proposition avec des informations sensibles retirées et attendrons votre confirmation avant de rendre le fichier public</li>
                </ul>
                <p class="mt-2">
                    Êtes-vous d'accord ?
                </p>
                <input
                    type="radio"
                    class="ml-5"
                    name="accord"
                > Oui<input
                    type="radio"
                    class="ml-5"
                    name="accord"
                >Non
            </section>
            <div class="mt-4">
                <button
                    v-if="step != 1"
                    class="button py-2 px-4 mr-4"
                    @click.prevent="PreviousStep"
                >
                    Previous Step
                </button>
                <button
                    v-if="step!= totalsteps"
                    class="button py-2 px-4"
                    @click.prevent="NextStep"
                >
                    Next Step
                </button>
                <button
                    v-if="step==3"
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4"
                    @click="Upload"
                >
                    Finish
                </button>
            </div>
        </form>
    </div> -->
</template>

<script lang="js">

import useVuelidate from '@vuelidate/core'
import { between, required, minLength, maxLength } from '@vuelidate/validators'
import { ref, reactive } from 'vue'

import SelectInput from '@/components/Input/SelectInput.vue'
import FileInput from '@/components/Input/FileInput.vue'
import MultiStepForm from '@/components/Form/MultiStepForm.vue'

export default {
    components: {
        SelectInput,
        FileInput,
        MultiStepForm
    },
    props:{
        steps: {
            type:Array,
            default(){
                return [
                    {
                        id: 'step1',
                        name: 'Informations principales',
                        icon: 'ri-bookmark-line'
                    }, {
                        id: 'step2',
                        name: 'Informations complémentaires',
                        icon: 'ri-user-add-line'
                    }, {
                        id: 'step3',
                        name: 'Finalisation',
                        icon: 'ri-mail-send-line'
                    }
                ]
            }
        }
    },
    setup () {
        return { v$: useVuelidate() }
    },
    validations() {
        return{
            stepsModel:{
                0:{
                    docSubject: { required },
                    filiere: { required },
                    docType: { required },
                    docContent: { required },
                    files: { required },
                },
                1:{
                    docName: { required },
                    docDescription: { required },},
                2:{
                    modifyDoc: { required }
                }
            }
        }
    },
    data () {
        return {
            filesEndpoint: 'http://localhost:5000/files',
            studyDocsEndpoint: 'http://localhost:5000/files/study-docs',
            show: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',

            stepAction:{
                currentStep: 0,
                nextStep: false,
                previousStep: false
            },
            stepsModel:{
                0:{
                    docSubject:'',
                    filiere:'',
                    docType:'',
                    docContent:'',
                    files:[],
                },
                1:{
                    docName:'',
                    docDescription:'',
                },
                2:{
                    modifyDoc:'false'
                }
            }
        }
    },
    methods: {
        previousStep(){
            this.stepAction.currentStep -= 1
        },
        nextStep(){
            console.log("next", this.v$.stepsModel[this.stepAction.currentStep].$errors)
            console.log("next", this.v$.stepsModel[this.stepAction.currentStep].$invalid)
            console.log(this.stepsModel[0].files)
            if(!this.v$.stepsModel[this.stepAction.currentStep].$invalid){

                this.stepAction.currentStep += 1
            }
        },
        submitForm(){
            let good = ()=>{

                for(let i=0; i< Object.getOwnPropertyNames(this.stepsModel).length; i++){
                    if(!this.v$.stepsModel[i].$invalid){
                        return false
                    }
                }
                return true
            }

            console.log(this.stepsModel, good())
        }
    },
}
</script>
