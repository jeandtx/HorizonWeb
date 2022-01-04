<template>
    <div class="flex border-t-1">
        <div
            class="
      text-1 text-sm
      p-1
    "
        >
            <div class="flex">
                <p>{{ comment.content }}</p>
                <p class="font-bold whitespace-nowrap">
                    &nbsp;- {{ comment.author.username }}
                </p>
                <span class="pl-2">
                    <i class="ri-heart-line" />
                    <!-- TODO: Actions -->
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="js">
export default {
    props: {
        comment: {
            type: Object,
            default: () => {}
        }
    },

    methods: {
    }
}
</script>
