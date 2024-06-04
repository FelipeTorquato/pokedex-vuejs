<template>
  <div>
    <Header />
    <div v-if="pokemon" class="pokemon">
      <div
        class="pokemon-header"
        :style="{ backgroundColor: getColor(pokemon.types[0]) }"
      >
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
        <h2>{{ pokemon.name }}</h2>
      </div>
      <div class="pokemon-info">
        <p>ID: {{ pokemon.id }}</p>
        <p v-if="pokemon.types.length > 0">Type 1: {{ pokemon.types[0] }}</p>
        <p v-if="pokemon.types.length > 1">Type 2: {{ pokemon.types[1] }}</p>
        <p>Height: {{ pokemon.height }}</p>
        <p>Weight: {{ pokemon.weight }}</p>

        <div class="stat">
          <label class="stat-label">HP:</label>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: getProgressWidth(pokemon.stats.hp) }"
            ></div>
          </div>
          <span>{{ pokemon.stats.hp }}</span>
        </div>

        <div class="stat">
          <label class="stat-label">Attack:</label>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: getProgressWidth(pokemon.stats.attack) }"
            ></div>
          </div>
          <span>{{ pokemon.stats.attack }}</span>
        </div>

        <div class="stat">
          <label class="stat-label">Defense:</label>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: getProgressWidth(pokemon.stats.defense) }"
            ></div>
          </div>
          <span>{{ pokemon.stats.defense }}</span>
        </div>

        <div class="stat">
          <label class="stat-label">Speed:</label>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: getProgressWidth(pokemon.stats.speed) }"
            ></div>
          </div>
          <span>{{ pokemon.stats.speed }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import Header from "@/components/Header.vue";
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

const getProgressWidth = (value: number): string => {
  const maxValue = Math.min(value, 100);
  return `${maxValue}%`;
};

onMounted(async () => {
  if (pokemonId) {
    try {
      const response = await PokeAPIService.getPokemonById(pokemonId);
      const pokemonData = response.data;
      const types = pokemonData.types.map(
        (typeInfo: any) => typeInfo.type.name
      );
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
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.pokemon-header {
  font-size: 35px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.pokemon-image {
  width: 200px;
  height: 200px;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin-left: 20px;
  margin-top: 20px;
}

.pokemon-info p {
  color: black;
  font-weight: bold;
  margin: 0 10px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-label {
  font-weight: bold;
}

.stat span {
  color: black;
  font-weight: bold;
}

.progress-bar {
  width: 100px;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
}

.progress {
  height: 100%;
  background-color: #76c7c0;
  border-radius: 5px;
}
</style>