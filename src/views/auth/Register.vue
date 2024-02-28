<script setup>
import axios from "@/helpers/axios";
import { ref } from "vue";
import { router } from "@/router";
const emit = defineEmits(["login"]);

const form = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});
async function register() {
  try {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/register", form.value);
    emit("login");
    router.push("/");
  } catch (err) {
    console.log("failure");
    console.log(err);
    // error.value = err;
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
        <form @submit.prevent="register" class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nome</span>
            </label>
            <input
              v-model="form.name"
              id="name"
              name="name"
              type="name"
              autocomplete="off"
              placeholder="nome"
              class="input input-bordered"
              required
            />
          </div>
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
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nova senha</span>
            </label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              name="password"
              autocomplete="new-password"
              placeholder="senha"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirme a senha</span>
            </label>
            <input
              v-model="form.password_confirmation"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              autocomplete="new-password"
              placeholder="senha"
              class="input input-bordered"
              required
            />
          </div>
          <div class="mt-6 form-control">
            <button class="btn btn-primary">Registrar</button>
          </div>
          <div class="mt-2 form-control">
            <label class="label">
              <router-link to="/login" class="label-text-alt link link-hover"
                >Já tem uma conta? Clique aqui para se autenticar.</router-link
              >
            </label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
