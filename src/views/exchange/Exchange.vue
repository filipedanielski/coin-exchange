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

const quantity = ref(50);
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
  <div class="flex flex-col self-center mt-4 lg:w-2/3">
    <div class="flex flex-col w-full lg:flex-row">
      <div
        class="grid flex-grow p-10 space-y-2 min-w-80 card bg-base-300 rounded-box place-items-center"
      >
        <div>Você vende:</div>
        <CurrencyInput
          v-model="quantity"
          :options="{ currency: 'BRL', precision: 2, valueRange: { min: 50 } }"
        />
        <div class="text-warning">
          Taxa:
          {{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(getFee().toFixed(2))
          }}
          (2%)
        </div>
      </div>
      <div class="divider text-info divider-info lg:divider-horizontal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="hidden w-12 h-12 lg:block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 lg:hidden"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </svg>
      </div>
      <div
        class="grid flex-grow p-10 space-y-2 min-w-80 card bg-base-300 rounded-box place-items-center"
      >
        <div>Selecione uma moeda estrangeira:</div>
        <div class="w-60">
          <Listbox v-model="selectedCurrency">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full max-w-xs shadow select select-bordered"
              >
                <span
                  class="fi"
                  :class="`fi-${selectedCurrency.country}`"
                ></span>
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
        <div class="text-primary">Preço: {{ price }}</div>
        <div class="text-success">
          Você compra: {{ ((quantity - getFee()) * price).toFixed(2) }}
          {{ selectedCurrency.code }}
        </div>
      </div>
    </div>
    <div class="self-center pt-6 lg:self-end">
      <button
        class="uppercase btn btn-xl btn-primary"
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
          <div class="flex justify-between px-2">
            <div>
              <div class="text-error">
                <span class="fi fi-br"></span>
                <span class="pl-1">
                  -
                  {{
                    quantity
                      ? new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(quantity.toFixed(2))
                      : 0
                  }}
                </span>
              </div>
              <div class="text-warning">
                Taxa:
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(getFee().toFixed(2))
                }}
                (2%)
              </div>
            </div>
            <div>
              <div class="text-success">
                <span :class="`fi fi-${selectedCurrency.country}`"></span>
                <span class="pl-1">
                  + {{ ((quantity - getFee()) * price).toFixed(2) }}
                  {{ selectedCurrency.code }}
                </span>
              </div>
              <div class="text-info">Preço: {{ price }}</div>
            </div>
          </div>
          <div class="py-4">
            <button
              class="uppercase btn btn-sm btn-success"
              @click.prevent="exchange"
              :disabled="!quantity"
            >
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>
