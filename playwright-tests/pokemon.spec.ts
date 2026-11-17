import { test, expect } from "@playwright/test"

const baseUrl = "https://pokeapi.co/api/v2/"

test("get favorite pokemon and verify type", async ({ request }) => {
  let favoritePokemon;
  let pokemonFormURL;

  await test.step("get favorite pokemon", async () => {

    const response = await request.get(`${baseUrl}pokemon?limit=50&offset=0`);
    expect(response).toBeOK();

    const data = await response.json();
    favoritePokemon = data.results.find(pokemon => pokemon.name === "pikachu");
  })

  await test.step("get pokemon form", async () => {
    const response = await request.get(`${favoritePokemon.url}`);
    expect(response).toBeOK();

    const pokemonForm = await response.json();

    // "forms" is an array containing an object with "name" and "url" keys
    // We need to index the first item of "forms" before accessing the url
    // OLD: pokemonFormURL = pokemonForm.forms.url;
    pokemonFormURL = pokemonForm.forms[0].url;
  })

  await test.step("verify pokemon type", async () => {
    const response = await request.get(`${pokemonFormURL}`);
    expect(response).toBeOK();

    const pokemonForm = await response.json();

    // "type" is an object containing "name" and "url" keys
    // We need to refer to "name" for the proper typing
    // OLD: const pokemonType = pokemonForm.types[0].type;
    const pokemonType = pokemonForm.types[0].type.name;
    expect(pokemonType).toBe('electric');
  })
})
