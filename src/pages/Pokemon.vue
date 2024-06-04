<template>
    <div>
      <Header />
      <div v-if="pokemon" class="pokemon">
        <div class="pokemon-header" :style="{ backgroundColor: getColor(pokemon.types[0]) }">
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
          <h2>{{ pokemon.name }}</h2>
        </div>
        <div v-if="pokemon">
          <div class="pokemon-info">
            <p>ID: {{ pokemon.id }}</p>
            <p v-if="pokemon.types.length > 0">Type 1: {{ pokemon.types[0] }}</p>
            <p v-if="pokemon.types.length > 1">Type 2: {{ pokemon.types[1] }}</p>
            <p>Height: {{ pokemon.height }}</p>
            <p>Weight: {{ pokemon.weight }}</p>
            <p>HP: {{ pokemon.stats.hp }}</p>
            <p>Attack: {{ pokemon.stats.attack }}</p>
            <p>Defense: {{ pokemon.stats.defense }}</p>
            <p>Speed: {{ pokemon.stats.speed }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
// @ts-ignore
import Header from "@/pages/Header.vue";
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  import PokeAPIService from "@/services/PokeAPIService";
  import { PokeColors } from "@/types/colors.enum";
  
  interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    stats: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
    };
  }
  
  const route = useRoute();
  const pokemonId = Number(route.params.id);
  const pokemon = ref<Pokemon | null>(null);
  
  const getColor = (type: string): string => {
    return PokeColors[type as keyof typeof PokeColors] || "#ccc";
  };
  
  onMounted(async () => {
    if (pokemonId) {
      try {
        const response = await PokeAPIService.getPokemonById(pokemonId);
        const pokemonData = response.data;
        const types = pokemonData.types.map((typeInfo: any) => typeInfo.type.name);
        pokemon.value = {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
          types: types,
          height: pokemonData.height,
          weight: pokemonData.weight,
          stats: {
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            defense: pokemonData.stats[2].base_stat,
            speed: pokemonData.stats[5].base_stat,
          },
        };
      } catch (error) {
        console.error("Failed to fetch pokemon:", error);
      }
    }
  });
  </script>
  
  <style scoped>
  .pokemon {
    width: 100%;
  }
  
  .pokemon-header {
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  
  .pokemon-image {
    width: 200px;
    height: 200px;
  }
  
  .pokemon-info {
    margin-top: 20px;
  }
  </style>
  