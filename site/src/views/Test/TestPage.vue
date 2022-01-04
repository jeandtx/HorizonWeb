<template>
    <FileInput
        class="h-52 w-full mt-4"
        :img-preview="false"
        :file-limit="1"
    />
</template>

<script>
import FileInput from '../../components/Input/FileInput.vue'

export default {
    components:{
        FileInput
    },
}
</script>
