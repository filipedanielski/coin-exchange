<script setup>
import axios from "@/helpers/axios";
import dayjs from "dayjs";
import { ref } from "vue";

const transactions = ref([]);

async function getTransactions() {
  const response = await axios.get("/api/exchange/transaction");
  transactions.value = response.data.map((transaction) => {
    return transaction;
  });
}

function orderTransactions() {
  transactions.value = transactions.value.reverse();
}

getTransactions();
</script>

<template>
  <div class="self-center mt-4 overflow-x-auto rounded-lg shadow md:w-2/3">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th></th>
          <th>Vendeu</th>
          <th>Taxa</th>
          <th>Preço</th>
          <th>Comprou</th>
          <th class="flex cursor-pointer" @click.prevent="orderTransactions">
            <span class="mr-2">Horário</span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions">
          <th>{{ index + 1 }}</th>
          <td class="text-error">
            <span class="fi fi-br"></span>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(transaction.quantity)
            }}
          </td>
          <td class="text-warning">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(transaction.fee)
            }}
          </td>
          <td class="text-primary">{{ transaction.rate }}</td>
          <td class="text-success">
            <span class="fi" :class="`fi-${transaction.to_currency.country}`"></span>
            {{ transaction.bought }} {{ transaction.to_currency.code }}
          </td>
          <td>
            {{ dayjs(transaction.created_at).format("DD/MM/YYYY HH:mm:ss") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
