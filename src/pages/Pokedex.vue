<template>
  <Header />
    <div class="pokemon-list">
      <router-link v-for="pokemon in pokemons" :key="pokemon.id" :to="`/pokemon/${pokemon.id}`" class="pokemon-card" :style="{ borderColor: getColor(pokemon.types[0]) }">
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
        <h2>{{ pokemon.name }}</h2>
        <div class="pokemon-info">
          <p>ID: {{ pokemon.id }}</p>
          <p v-if="pokemon.types.length > 0">Type 1: {{ pokemon.types[0] }}</p>
          <p v-if="pokemon.types.length > 1">Type 2: {{ pokemon.types[1] }}</p>
        </div>
      </router-link>
    </div>
</template>

<script scoped lang="ts">
// @ts-ignore
import Header from "@/components/Header.vue";
import { defineComponent } from 'vue';
import PokeAPIService from '@/services/PokeAPIService';
import { PokeColors } from '@/types/colors.enum';

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
  methods: {
    getColor(type: string): string {
      return PokeColors[type as keyof typeof PokeColors] || '#ccc';
    }
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
}

.pokemon-card {
  border: 5px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-info {
  margin-top: 10px;
}
</style>
