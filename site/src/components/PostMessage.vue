<template>
    <div>
        <div class="text-1">
            <div class="flex mt-1">
                <div class="flex flex-col flex-shrink-0 w-3/24 items-center text-lg pt-4 gap-4">
                    <div class="flex items-center flex-col">
                        <i class="ri-arrow-up-s-line ri-lg" />
                        <div class="text-center text-xl">
                            {{ post.upvotes }}
                        </div>
                        <i class="ri-arrow-down-s-line ri-lg" />
                    </div>
                    <div class="flex flex-col">
                        <div
                            v-for="(action,i) in otherActions"
                            :key="i"
                            class="flex items-center text-5 rounded transition"
                            :class="actionsMap[action].class"
                            @click="actionsMap[action].action"
                        >
                            <i
                                :class="actionsMap[action].icon"
                                class="ri-lg"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-21/24">
                    <div class="p-1 mt-2 text-2 text-sm">
                        <TipTapRenderer
                            :content="post.body"
                        />
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex">
                            <div class="w-16 h-16 p-3">
                                <img
                                    :src="post.author.avatar"
                                    alt="Profile Picture"
                                    class="rounded"
                                >
                            </div>

                            <div class="my-3 mx-2 flex">
                                <div class="flex flex-col">
                                    <div class="font-medium">
                                        {{ post.author.username }}
                                    </div>
                                    <div class="text-sm">
                                        {{ post.author.reputation }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="ml-3 flex items-center ri-lg space-x-4">
                                <div
                                    v-for="(action,i) in actionsBar"
                                    :key="i"
                                    class="flex gap-1 items-center text-5 group transition"
                                    :class="actionsMap[action].class"
                                    @click="actionsMap[action].action"
                                >
                                    <i
                                        :class="actionsMap[action].icon"
                                        class="ri-md"
                                    />
                                    <p class="text-sm group-hover:underline">
                                        {{ actionsMap[action].name() }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div
                            v-for="comment in post.comments"
                            :key="comment"
                            class=""
                        >
                            <Comment :comment="comment" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import Comment from './PostComment.vue'
import TipTapRenderer from '@/components/TipTap/TipTapRenderer.vue'

export default {
    components: {
        Comment,
        TipTapRenderer
    },
    props: {
        post: {
            type: Object,
            default: () => {}
        },
        actionsBar: {
            type: Array,
            default: function () {
                return [
                    'reply',
                    'viewComments',
                    'edit',
                    'flag'
                ]
            }
        },
        otherActions:{
            type: Array,
            default: function () {
                return [
                    'favorite',
                ]
            }
        }
    },
    emits: ['reply'],
    computed: {
        actionsMap () {
            // TODO: Actions
            return {
                reply: { name:()=> 'Répondre', icon: 'ri-reply-fill', class:"hover:text-blue-500", action:  () => { this.$emit("reply"); console.log("Reply")} },
                viewComments: { name:()=> 'Commenter', icon: 'ri-chat-new-line', class:"hover:text-blue-500", action: function () { console.log('Commentaire') } },
                favorite: { name:()=> 'Répondre', icon: 'ri-star-line', class:"hover:text-yellow-500", action: function () { console.log('Favori') } },
                edit: { name:()=> 'Édit', icon: 'ri-edit-line', class:"hover:text-green-500", action: function () { console.log('Éditer') } },
                flag: { name:()=> 'Signaler', icon: 'ri-flag-line', class:"hover:text-orange-500", action: function () { console.log('Signaler') } }
            }
        }
    },

}
</script>
