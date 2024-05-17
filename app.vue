<template>
  <div>
   CLIENT
   <q-btn>OK</q-btn>
  </div>
</template>
<script setup>
import Test from './conector/Test'

console.log('******')
const t = new Test()
t.test()
</script>
