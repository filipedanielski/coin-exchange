<template>
    <input
      ref="inputRef"
      type="text"
      class="w-full max-w-xs input input-bordered"
    />
  </template>
  
  <script>
  import { useCurrencyInput } from 'vue-currency-input'
  
  export default {
    name: 'CurrencyInput',
    props: {
      modelValue: Number,
      options: Object
    },
    setup(props) {
      const { inputRef } = useCurrencyInput(props.options)
  
      return { inputRef }
    }
  }
  </script>
  