<script setup>
import axios from "@/helpers/axios";
import { ref } from "vue";
// import { router } from "@/router";
import Nav from "@/components/Nav.vue";

const user = ref("");

async function getUser() {
  const response = await axios.get("/api/user");
  user.value = response.data.name;
}

getUser();
</script>

<template>
  <div class="min-h-screen">
    <Nav v-if="user" :user="user" @logout="() => (user = '')">
      <router-view />
    </Nav>
    <router-view v-else @login="getUser" />
  </div>
</template>
