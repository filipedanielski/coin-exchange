<script setup>
import axios from "@/helpers/axios";
import { ref } from "vue";
// import { router } from "@/router";
import Layout from "@/components/AuthLayout.vue";

const user = ref("");

async function getUser() {
  const response = await axios.get("http://localhost/api/user");
  user.value = response.data.name;
}

getUser();
</script>

<template>
  <div>
    <Layout v-if="user" :user="user" @logout="() => (user = '')">
      <router-view />
    </Layout>
    <router-view @login="getUser" v-else />
  </div>
</template>
