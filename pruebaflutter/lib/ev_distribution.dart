import 'package:flutter/material.dart';

class EVDistribution extends StatefulWidget {
  const EVDistribution({super.key});

  @override
  _EVDistributionState createState() => _EVDistributionState();
}

class _EVDistributionState extends State<EVDistribution> {
  final int maxEV = 510;
  final Map<String, int> _evs = {
    'HP': 0,
    'Attack': 0,
    'Defense': 0,
    'Sp. Attack': 0,
    'Sp. Defense': 0,
    'Speed': 0,
  };

  int get _totalEVs => _evs.values.reduce((a, b) => a + b);

  void _updateEV(String stat, int value) {
    setState(() {
      _evs[stat] = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Distribución de EVs')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              'Total EVs: $_totalEVs / $maxEV',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ..._evs.keys.map((stat) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(stat),
                  Slider(
                    value: _evs[stat]!.toDouble(),
                    min: 0,
                    max: 252,
                    divisions: 252,
                    label: _evs[stat].toString(),
                    onChanged: (value) {
                      if (_totalEVs - _evs[stat]! + value.toInt() <= maxEV) {
                        _updateEV(stat, value.toInt());
                      }
                    },
                  ),
                ],
              );
            }),
          ],
        ),
      ),
    );
  }
}
