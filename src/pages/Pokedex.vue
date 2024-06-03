<template>
  <Header />
  <div>
    <div class="pokemon-list">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card">
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
        <div class="pokemon-info">
          <h2>{{ pokemon.name }}</h2>
          <p>ID: {{ pokemon.id }}</p>
          <p v-if="pokemon.types.length > 0">Type 1: {{ pokemon.types[0] }}</p>
          <p v-if="pokemon.types.length > 1">Type 2: {{ pokemon.types[1] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped lang="ts">
// @ts-ignore
import Header from "@/pages/Header.vue";
import { defineComponent } from 'vue';
import PokeAPIService from '@/services/PokeAPIService';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default defineComponent({
  name: 'Pokedex',
  components: {
    Header
  },
  data() {
    return {
      pokemons: [] as Pokemon[]
    };
  },
  async created() {
    try {
      const response = await PokeAPIService.getPokemons(151);
      const pokemonDetailsPromises = response.data.results.map((pokemon: any) =>
        PokeAPIService.getPokemonByName(pokemon.name)
      );
      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
      this.pokemons = pokemonDetailsResponses.map((res: any) => {
        const pokemonData = res.data;
        const types = pokemonData.types.slice(0, 2).map((typeInfo: any) => typeInfo.type.name);
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
          types: types
        };
      });
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
    }
  }
});
</script>

<style scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 100px;
  width: 98vw; /* Alterado para ocupar toda a largura da tela */
  padding-left: 20px;
  padding-right: 20px;
}

.pokemon-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-info {
  margin-top: 10px;
}
</style>
