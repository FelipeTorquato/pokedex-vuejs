import axios, { type AxiosResponse } from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface PokemonDetail {
    weight: number;
    height: number;
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    types: {
        slot: number;
        type: {
          name: string;
        };
      }[];
  }

interface Ability {
  id: number;
  name: string;
  // Adicione mais campos conforme necessário
}

const PokeAPIService = {
  getPokemons(limit = 20, offset = 0): Promise<AxiosResponse<PokemonResponse>> {
    return axios.get(`${API_URL}/pokemon`, {
      params: {
        limit,
        offset
      }
    });
  },

  getPokemonByName(name: string): Promise<AxiosResponse<PokemonDetail>> {
    return axios.get(`${API_URL}/pokemon/${name}`);
  },

  getPokemonById(id: number): Promise<AxiosResponse<PokemonDetail>> {
    return axios.get(`${API_URL}/pokemon/${id}`);
  },

  getPokemonSpeciesById(id: number): Promise<AxiosResponse<any>> { // Defina uma interface para a resposta se necessário
    return axios.get(`${API_URL}/pokemon-species/${id}`);
  },

  getAbilities(): Promise<AxiosResponse<{ results: Ability[] }>> {
    return axios.get(`${API_URL}/ability`);
  },

  getAbilityByName(name: string): Promise<AxiosResponse<Ability>> {
    return axios.get(`${API_URL}/ability/${name}`);
  },

  getAbilityById(id: number): Promise<AxiosResponse<Ability>> {
    return axios.get(`${API_URL}/ability/${id}`);
  }
};

export default PokeAPIService;
