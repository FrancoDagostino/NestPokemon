import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IPokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {


  constructor(@InjectModel(Pokemon.name)
  private readonly pokemonModel: Model<Pokemon>, private readonly http: AxiosAdapter) { }


  async executeSeed() {

    await this.pokemonModel.deleteMany();

    const data = await this.http.get<IPokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1500');

    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach((pokemon) => {
      const segments = pokemon.url.split('/');
      const no: number = Number(segments[segments.length - 2]);

      pokemonToInsert.push({ name: pokemon.name, no })
    });

    await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed Executed'
  }
}
