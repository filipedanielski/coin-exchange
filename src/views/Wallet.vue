<script setup>
import axios from "@/helpers/axios";
import { ref } from "vue";
import FundCard from "@/components/FundCard.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";

const quantity = ref(0.0);
const wallets = ref([]);
const fallback = ref({
  quantity: 0.0,
  currency: { code: "BRL", description: "Real Brasileiro", country: "br" },
});

async function getWallets() {
  const response = await axios.get("http://localhost/api/wallet");
  wallets.value = response.data.map((wallet) => {
    return { quantity: wallet.quantity, currency: wallet.currency };
  });
}

async function addFunds() {
  try {
    await axios.post("http://localhost/api/wallet", {
      quantity: quantity.value,
      currency_id: 1,
    });
    add_funds.close();
    getWallets();
  } catch (err) {
    // add validation errors
    console.log("failure");
    console.log(err);
    // error.value = err;
  }
}

getWallets();
</script>

<template>
  <div class="self-center w-2/3 mt-2">
    <div class="m-5">
      <button class="btn btn-xs btn-primary" onclick="add_funds.showModal()">
        Adicionar fundos
      </button>
      <dialog id="add_funds" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="pb-4 text-lg font-bold">
            Adicionar fundos à sua carteira
          </h3>
          <CurrencyInput v-model="quantity" :options="{ currency: 'BRL', precision: 2 }" />
          <div class="py-4">
            <button class="btn btn-sm btn-success" @click.prevent="addFunds">
              Enviar
            </button>
          </div>
        </div>
      </dialog>
    </div>
    <div class="grid gap-6 lg:grid-flow-row lg:grid-cols-3">
      <FundCard
        v-if="wallets.length"
        v-for="wallet in wallets"
        :wallet="wallet"
      />
      <FundCard v-else :wallet="fallback" />
    </div>
  </div>
</template>
