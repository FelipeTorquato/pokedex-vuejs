<template>
  <Header />
  <div class="party">
    <router-link v-for="n in 6" :key="n" class="pokemon-card" :to="`/`">
      <p>+</p>
      <p>Adicionar Pokemon</p>
    </router-link>
  </div>
</template>
<script scoped setup lang="ts">
// @ts-ignore
import Header from "@/components/Header.vue";
</script>

<style scoped>
.party {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
  margin-top: 100px;
}

.pokemon-card {
  border: 5px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.pokemon-card p {
  margin: 10px 0;
  font-size: 1.2em;
  font-weight: bold;
}

.header nav-link {
  text-decoration: underline;
}
</style>
