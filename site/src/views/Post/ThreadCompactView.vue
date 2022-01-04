<template>
    <div v-if="post === null || post === undefined">
        Ce post n'existe pas.
    </div>
    <div v-else>
        <div class="w-21/24 mx-auto my-6 flex flex-col">
            <div class="text-1 w-full md:w-9/12 text-3xl font-bold mb-2">
                {{ post.title }}
            </div>
            <div class="flex ">
                <div class="card">
                    <div class="text-1">
                        <div class="flex justify-between items-center">
                            <div
                                class="flex flex-row gap-4 text-1 rounded-md flex-shrink-0"
                            >
                                <!-- TODO: Talk tab -->
                                <div class="border-b-2 border-blue-500">
                                    Post
                                </div>
                                <div class="border-b-2 border-transparent hover:border-blue-300">
                                    Talk
                                </div>
                            </div>
                            <div class="text-2 text-sm flex gap-2">
                                <div class="flex space-x-2">
                                    <i class="ri-pencil-line" />
                                    <p>{{ timeAgo(post.createdAt, "long") }}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <i class="ri-history-line" />
                                    <p>{{ timeAgo(post.contentLastUpdatedAt, "long") }}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <i class="ri-eye-line" />
                                    <p>{{ post.views }} vues</p>
                                </div>
                            </div>
                        </div>
                        <hr class="mt-3 mb-2">
                    </div>
                    <div>
                        <div>
                            <div>
                                <Post
                                    :post="post"
                                    @reply="onReply = true"
                                />
                            </div>
                            <div class="pt-4 text-1">
                                {{ post.replies.length }} {{ post.replies.length > 1 ? 'Réponses' : 'Réponse' }}
                            </div>
                            <hr class="mt-2">
                            <div
                                v-if="onReply"
                                class="flex"
                            >
                                <div class="w-3/24" />
                                <div class="flex flex-col w-21/24 gap-4">
                                    <tip-tap-editor
                                        v-model="tiptapReply"
                                        :char-count-limit="240"
                                        class="w-full"
                                    />
                                    <div class="flex gap-2">
                                        <button
                                            class="button-red"
                                            @click="onReply = false"
                                        >
                                            <p class="">
                                                Annuler
                                            </p>
                                        </button>
                                        <button
                                            class="button"
                                            @click="sendReply()"
                                        >
                                            <p class="">
                                                Envoyer
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-for="(reply, i) in replyNull"
                                :key="i"
                            >
                                <reply :reply="reply" />
                            </div>
                            <div
                                v-for="(reply, i) in post.replies"
                                :key="i"
                                class="mt-4"
                            >
                                <reply :reply="reply" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-3/12 ml-4 text-1 sticky top-0 space-y-2 hidden lg:block">
                    <div class="card">
                        <div class="flex mb-2 space-x-2 text-xl items-center">
                            <div class="font-bold text-md mr-4">
                                Tags
                            </div>
                            <!-- TODO: Actions -->
                            <i class="ri-settings-2-line" />
                            <i class="ri-menu-add-line" />
                        </div>
                        <div class="flex flex-wrap">
                            <tag
                                v-for="tag in post.tags"
                                :key="tag"
                                class="mr-1 mb-1"
                                :name="tag.title"
                                :color="tag.color"
                            />
                        </div>
                    </div>
                    <div class="card">
                        <div class="flex mb-2 space-x-2 text-xl items-center">
                            <div class="font-bold text-md mr-4">
                                Contributeurs
                            </div>
                            <i class="ri-settings-2-line" />
                            <i class="ri-arrow-left-right-line" />
                        </div>
                        <!-- TODO: Actions -->
                        <contributors
                            v-for="contributor in post.contributors"
                            :key="contributor"
                            :contributor="contributor"
                            class="inline-block"
                        />
                    </div>
                    <div class="card">
                        <div class="flex mb-3 space-x-2 text-xl items-center">
                            <div class="font-bold text-md mr-4">
                                Sujets semblables
                            </div>
                            <!-- TODO: Actions -->
                            <i class="ri-menu-add-line" />
                            <i class="ri-arrow-left-circle-fill" />
                            <i class="ri-arrow-right-circle-fill" />
                        </div>
                        <similar-thread
                            v-for="similarThread in post.similarThreads"
                            :key="similarThread"
                            :thread="similarThread"
                            class="mb-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import Reply from '@/components/PostReply.vue'
import Tag from '@/components/ColoredTag.vue'
import Contributors from '@/components/PostContributor.vue'
import SimilarThread from '@/components/SimilarThread.vue'
import Post from '@/components/PostMessage.vue'
import TipTapEditor from '@/components/TipTap/TipTapEditor.vue'

import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { posts } from '../../fake/posts'

import { users } from '@/fake/users'

export default {
    components: {
        Tag,
        Contributors,
        SimilarThread,
        Reply,
        Post,
        TipTapEditor
    },
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            onReply : false,
            tiptapReply:'',
            post: undefined,
            replyNull:[]
        }
    },
    validations(){
        return {
            tiptapReply:{ required }
        }
    },
    mounted() {
        this.fetchPost()
    },
    methods: {
        fetchPost() {
            console.log(posts)
            this.post = posts[this.$route.params.id] ?? null
        },
        timeAgo (input, style) {
            const date = (input instanceof Date) ? input : new Date(input)
            const formatter = new Intl.RelativeTimeFormat('fr', { style })
            const ranges = {
                years: 3600 * 24 * 365,
                months: 3600 * 24 * 30,
                weeks: 3600 * 24 * 7,
                days: 3600 * 24,
                hours: 3600,
                minutes: 60,
                seconds: 1
            }
            const secondsElapsed = (date.getTime() - Date.now()) / 1000
            for (const key in ranges) {
                if (ranges[key] < Math.abs(secondsElapsed)) {
                    const delta = secondsElapsed / ranges[key]
                    return formatter.format(Math.round(delta), key)
                }
            }
        },
        sendReply(){
            console.log(this.tiptapReply, this.v$.tiptapReply.$invalid)
            this.replyNull.push(
                {
                    content: this.tiptapReply,
                    author: users[0],
                    comments: []
                }
            )
        }

    }
}
</script>
