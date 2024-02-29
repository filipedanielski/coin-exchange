<script setup>
import axios from "@/helpers/axios";
import { ref } from "vue";
import { router } from "@/router";
import { toast } from 'vue3-toastify';
const emit = defineEmits(["login"]);

const form = ref({
  email: null,
  password: null,
});
const validation = ref([]);

async function login() {
  try {
    await axios.get("/sanctum/csrf-cookie");
    const response = await axios.post("/login", form.value);
    emit("login");
    toast("Usuário logado.");
    router.push({ name: "wallet" });
  } catch (err) {
    if (err.status === 422) {
      validation.value = err.validation;
    } else {
      toast(err.message);
    }
  }
}
</script>

<template>
  <div class="min-h-screen hero bg-base-200">
    <div class="flex-col hero-content lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="flex space-x-2 text-5xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="self-end w-10 h-10 stroke-yellow-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span> Coin Exchange </span>
        </h1>
        <p class="py-6">
          Esta é uma aplicação de teste no formato de um sistema de compra de
          moedas. Ela é construída em Vue.js juntamente com uma API em Laravel.
        </p>
      </div>
      <div class="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
        <form @submit.prevent="login" class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="form.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="email"
              class="input input-bordered"
              required
            />
            <div class="mt-2 text-xs text-error">{{ validation.email }}</div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Senha</span>
            </label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              name="password"
              autocomplete="off"
              placeholder="senha"
              class="input input-bordered"
              required
            />
            <div class="mt-2 text-xs text-error">{{ validation.password }}</div>
          </div>
          <div class="mt-6 form-control">
            <button class="btn btn-primary">Entrar</button>
          </div>
          <div class="mt-2 form-control">
            <label class="label">
              <router-link :to="{ name: 'register' }" class="label-text-alt link link-hover"
                >Não tem uma conta? Clique aqui para se registrar.</router-link
              >
            </label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
