<script setup>
import axios from "@/helpers/axios";
import { router } from "@/router";
import { ref } from "vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const quantity = ref(0.0);
const price = ref(0.0);
const localCurrency = ref({
  id: 1,
  code: "BRL",
  description: "Real Brasileiro",
  country: "br",
});
const foreignCurrencies = ref([]);
const selectedCurrency = ref({});

async function getForeignCurrencies() {
  const response = await axios.get("http://localhost/api/exchange/currencies");
  foreignCurrencies.value = response.data;
  selectedCurrency.value = foreignCurrencies.value[0];
  getPrice();
}

async function getPrice() {
  const response = await axios.get(
    `http://localhost/api/exchange/price?from=${localCurrency.value.code}&to=${selectedCurrency.value.code}`
  );
  price.value = response.data;
}

function getFee() {
  return quantity.value * 0.02;
}

async function exchange() {
  try {
    await axios.post("http://localhost/api/exchange/transaction", {
      quantity: quantity.value,
      from: localCurrency.value.code,
      to: selectedCurrency.value.code,
    });
    confirm_exchange.close();
    router.push({ name: "wallet" });
  } catch (err) {
    // add validation errors
    console.log("failure");
    console.log(err);
    // error.value = err;
  }
}

getForeignCurrencies();
</script>

<template>
  <div class="flex flex-col">
    <div>Moeda local: {{ localCurrency.code }}</div>
    <div>Selecione uma moeda estrangeira:</div>
    <div class="w-60">
      <Listbox v-model="selectedCurrency">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full max-w-xs shadow select select-bordered"
          >
            <span class="fi" :class="`fi-${selectedCurrency.country}`"></span>
            <span class="self-center pl-2">
              {{ selectedCurrency.code }} -
              {{ selectedCurrency.description }}
            </span>
          </ListboxButton>
          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-base-300 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                class="relative py-2 pl-10 pr-4 cursor-pointer select-none"
                v-for="currency in foreignCurrencies"
                :key="currency.id"
                :value="currency"
                @click="getPrice"
              >
                <span class="fi" :class="`fi-${currency.country}`"></span>
                <span class="self-center pl-2">
                  {{ currency.code }} - {{ currency.description }}
                </span>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
    <div>Conversão: {{ price }}</div>
    <div>Você vende:</div>
    <CurrencyInput v-model="quantity" :options="{ currency: 'BRL' }" />
    <div>
      Taxa:
      {{
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(getFee().toFixed(2))
      }}
      (2%)
    </div>
    <div>
      Você compra: {{ ((quantity - getFee()) * price).toFixed(2) }}
      {{ selectedCurrency.code }}
    </div>
    <div class="m-5">
      <button
        class="btn btn-sm btn-primary"
        onclick="confirm_exchange.showModal()"
      >
        Comprar
      </button>
      <dialog id="confirm_exchange" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="pb-4 text-lg font-bold">Resumo da sua compra</h3>
          <div>
            Você vende:
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(quantity.toFixed(2))
            }}
          </div>
          <div>Conversão: {{ price }}</div>
          <div>
            Taxa:
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(getFee().toFixed(2))
            }}
            (2%)
          </div>
          <div>
            Você compra: {{ ((quantity - getFee()) * price).toFixed(2) }}
            {{ selectedCurrency.code }}
          </div>
          <div class="py-4">
            <button class="btn btn-sm btn-success" @click.prevent="exchange">
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>
