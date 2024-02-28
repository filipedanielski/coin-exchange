<script setup>
const props = defineProps(["wallet"]);
</script>

<template>
  <div class="shadow-lg rounded-2xl bg-base-300 stat">
    <div class="stat-figure">
      <span
        class="relative inline-block leading-none bg-bottom bg-no-repeat bg-contain size-12"
        :class="`fi-${wallet.currency.country}`"
      ></span>
    </div>
    <div class="text-base">Saldo {{ wallet.currency.code }}</div>
    <div
      v-if="wallet.currency.country === 'br'"
      class="stat-value text-secondary"
    >
      {{
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(wallet.quantity)
      }}
    </div>
    <div v-else class="stat-value text-secondary">${{ wallet.quantity }}</div>
    <div class="stat-desc text-secondary">
      {{ wallet.currency.description }}
    </div>
  </div>
</template>
