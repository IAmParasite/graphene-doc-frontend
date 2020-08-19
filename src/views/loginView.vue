<template>
    <div v-title data-title="Hi, 请登录/注册">
        <login></login>
    </div>
</template>

<script>
import login from "../components/login.vue"

export default {
    name: "loginView",
    components: {
        login
    }
}
</script>