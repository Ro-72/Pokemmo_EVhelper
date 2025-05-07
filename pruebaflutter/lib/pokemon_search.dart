import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class PokemonSearch extends StatefulWidget {
  const PokemonSearch({super.key});

  @override
  PokemonSearchState createState() => PokemonSearchState();
}

class PokemonSearchState extends State<PokemonSearch> {
  final TextEditingController _controller = TextEditingController();
  Map<String, dynamic>? _pokemonData;

  Future<void> _searchPokemon(String query) async {
    final url = 'https://pokeapi.co/api/v2/pokemon/$query';
    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        setState(() {
          _pokemonData = json.decode(response.body);
        });
      } else {
        setState(() {
          _pokemonData = null;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Pokémon no encontrado')),
        );
      }
    } catch (e) {
      setState(() {
        _pokemonData = null;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error al buscar Pokémon')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Buscar Pokémon')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(
                labelText: 'Nombre o ID del Pokémon',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () => _searchPokemon(_controller.text.trim().toLowerCase()),
              child: const Text('Buscar'),
            ),
            const SizedBox(height: 20),
            if (_pokemonData != null) ...[
              Text(
                _pokemonData!['name'].toString().toUpperCase(),
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              Image.network(_pokemonData!['sprites']['front_default']),
              Text('ID: ${_pokemonData!['id']}'),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context, _pokemonData);
                },
                child: const Text('Guardar'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
