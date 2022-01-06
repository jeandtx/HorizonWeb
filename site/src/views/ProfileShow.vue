<template>
    <div class="mx-auto pb-6 text-1 md:flex md:space-x-4s">
        <div class=" md:w-1/2 lg:w-2/3 m-4 space-y-4">
            <div class="card p-0 pb-6">
                <div class="relative h-48 w-full">
                    <div class="banner w-full h-full rounded-t-md" />
                    <!-- <div class="flex absolute top-0 bg-gray-500 opacity-50 rounded items-center justify-center w-full h-full">
                Changer votre banniere
              </div> -->
                    <img
                        :src="user.avatar"
                        alt=""
                        class="absolute right-10 -bottom-1/4 h-32 w-32 rounded-full"
                    >
                </div>
                <div class="mt-20 px-4 w-full">
                    <div class="flex flex-col pr-8 space-y-4 mb-4 ">
                        <div>
                            <div>
                                <div class="inline-block text-2xl">
                                    {{ user.username }}
                                </div>
                                <div class="text-gray-500 inline-block ml-2 mb-4">
                                    {{ 'M2-F' }}
                                </div>
                            </div>
                            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, impedit deserunt? Magni est atque sapiente temporibus quia, quaerat, voluptates qui fuga sequi deserunt, perferendis dolorem repellat. Rem quam molestias optio nesciunt similique illum repudiandae iure libero, ullam doloremque eius cupiditate voluptate tempora, maxime tenetur ea, facere impedit. Aliquid numquam consequuntur consequatur reiciendis aut sequi, neque, doloribus, quasi incidunt eum accusamus!</div>
                        </div>

                        <div v-if="assos.length != 0">
                            <div class="text-lg">
                                Associations
                            </div>
                            <div
                                v-for="asso in assos"
                                :key="asso"
                                class="flex mt-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col card flex-grow space-y-4">
                <div>Activité</div>
                <post-card-vue
                    v-for="activitie in activities"
                    :key="activitie.index"
                    :post="activitie"
                />
            </div>
        </div>
        <div class="flex flex-col space-y-4 md:w-1/2 lg:w-1/3">
            <div class="card">
                <a href="#/settings">Modifier le Profil</a>
            </div>
            <div class="card">
                Badges
                <div class="flex mt-2 space-x-1">
                    <i class="ri-medal-line ri-xl" />
                    <i class="ri-medal-line ri-xl" />
                    <i class="ri-medal-line ri-xl" />
                    <i class="ri-medal-line ri-xl" />
                </div>
            </div>
            <div class="card">
                Comptes
                <div class="flex flex-col space-y-2 mt-2">
                    <div class="flex space-x-2">
                        <i class="ri-mail-fill ri-md" />
                        <div>{{ user.email }}</div>
                    </div>
                    <div class="flex space-x-2">
                        <i class="ri-linkedin-fill ri-md" />
                        <div>JeanRoure</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { posts } from '@/fake/posts'
import { users } from '@/fake/users'
import PostCardVue from '../components/Card/PostCard.vue'
export default {
    components: {
        PostCardVue
    },
    data () {
        return {
            activities: posts,
            user: users[1],
            assos : []
        }
    }
}
</script>

<style lang="scss">
.banner {
  background-color: #386376;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='96' viewBox='0 0 60 96'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2335313c' fill-opacity='0.44'%3E%3Cpath d='M36 10a6 6 0 0 1 12 0v12a6 6 0 0 1-6 6 6 6 0 0 0-6 6 6 6 0 0 1-12 0 6 6 0 0 0-6-6 6 6 0 0 1-6-6V10a6 6 0 1 1 12 0 6 6 0 0 0 12 0zm24 78a6 6 0 0 1-6-6 6 6 0 0 0-6-6 6 6 0 0 1-6-6V58a6 6 0 1 1 12 0 6 6 0 0 0 6 6v24zM0 88V64a6 6 0 0 0 6-6 6 6 0 0 1 12 0v12a6 6 0 0 1-6 6 6 6 0 0 0-6 6 6 6 0 0 1-6 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
