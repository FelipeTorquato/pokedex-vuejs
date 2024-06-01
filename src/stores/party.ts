import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePartyStore = defineStore('party', () => {
  const party = ref([] as any[])
  
  function addPokemon(pokemon: any) {
    party.value.push(pokemon)
  }

  return { party, addPokemon }
})
