import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const maxEV = 510; // Maximum total EV value
  const [evs, setEvs] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
  });
  const [region, setRegion] = useState('Unova'); // Default region

  const evTrainingData = {
    hp: [
      { pokemon: 'Marill', location: 'Route 114', method: 'Surf', region: 'Hoenn', encounter: '100% HP EV Encounter' },
      { pokemon: 'Dunsparce', location: 'Three Isle Port', method: 'Grass', region: 'Kanto', encounter: '100% HP EV Encounter' },
      { pokemon: 'Wobbuffet, Lickitung', location: 'Cerulean Cave Entrance', method: '—', region: 'Kanto', encounter: '100% HP EV Encounter' },
      { pokemon: 'Lickitung', location: 'Route 44', method: 'Grass', region: 'Johto', encounter: '100% HP EV Encounter' },
      { pokemon: 'Loudred', location: 'Desert Underpass', method: '—', region: 'Hoenn', encounter: '100% HP EV Encounter' },
      { pokemon: 'Hariyama', location: 'Victory Road', method: '—', region: 'Hoenn', encounter: '100% HP EV Encounter' },
      { pokemon: 'Sealeo', location: 'Route 230', method: 'Surf', region: 'Sinnoh', encounter: '100% HP EV Encounter' },
      { pokemon: 'Stunfisk', location: 'Icirrus City', method: 'Surf in Pond', region: 'Unova', encounter: '100% HP EV Encounter' },
      { pokemon: 'Amoonguss', location: 'Route 10', method: 'Dark Grass', region: 'Unova', encounter: '100% HP EV Encounter' },
    ],
    attack: [
      { pokemon: 'Rhydon', location: 'Victory Road', method: 'Cave', region: 'Sinnoh', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Paras', location: 'Mt. Moon B1F', method: 'Cave', region: 'Kanto', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Nidorino', location: 'Route 15', method: 'Grass', region: 'Kanto', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Primeape, Arbok', location: 'Route 23', method: 'Grass', region: 'Kanto', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Kingler, Machoke', location: 'Cliff Cave', method: 'Cave', region: 'Johto', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Ariados, Banette', location: 'Sky Pillar', method: 'Cave', region: 'Hoenn', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Bouffalant', location: 'Route 10', method: 'Grass', region: 'Unova', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Tranquill', location: 'Route 12', method: 'Dark Grass', region: 'Unova', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Bibarel', location: 'Sendoff Spring', method: 'Grass', region: 'Sinnoh', encounter: '100% Atk EV Encounter' },
      { pokemon: 'Machoke', location: 'Route 211', method: 'Grass', region: 'Sinnoh', encounter: '100% Atk EV Encounter' },
    ],
    defense: [
      { pokemon: 'Pelipper', location: 'Undella Bay', method: 'Surf', region: 'Unova', encounter: '100% Def EV Encounter' },
      { pokemon: 'Sandslash, Marowak', location: 'Victory Road', method: '—', region: 'Kanto', encounter: '100% Def EV Encounter' },
      { pokemon: 'Tangela', location: 'Route 21', method: 'Grass', region: 'Kanto', encounter: '100% Def EV Encounter' },
      { pokemon: 'Slowbro', location: 'Cape Brink, Two Island', method: 'Grass', region: 'Kanto', encounter: '100% Def EV Encounter' },
      { pokemon: 'Metapod, Kakuna', location: 'Pattern Bush, Six Island', method: 'Grass', region: 'Kanto', encounter: '100% Def EV Encounter' },
      { pokemon: 'Sandslash', location: 'Route 26', method: 'Grass', region: 'Johto', encounter: '100% Def EV Encounter' },
      { pokemon: 'Pelipper', location: 'Ever Grande City Entrance', method: 'Surf', region: 'Hoenn', encounter: '100% Def EV Encounter' },
      { pokemon: 'Pelipper', location: 'Route 222', method: 'Surf', region: 'Sinnoh', encounter: '100% Def EV Encounter' },
    ],
    spAttack: [
      { pokemon: 'Golduck', location: 'Cape Brink', method: 'Surf', region: 'Kanto', encounter: '100% Sp Atk EV Encounter' },
      { pokemon: 'Flaaffy, Girafarig', location: 'Route 43', method: 'Grass', region: 'Johto', encounter: '100% Sp Atk EV Encounter' },
      { pokemon: 'Gloom', location: 'Route 119', method: 'Grass', region: 'Hoenn', encounter: '100% Sp Atk EV Encounter' },
      { pokemon: 'Golduck', location: 'Resort Area', method: 'Surf', region: 'Sinnoh', encounter: '100% Sp Atk EV Encounter' },
      { pokemon: 'Duosion', location: 'Route 9', method: 'Grass', region: 'Unova', encounter: '100% Sp Atk EV Encounter' },
      { pokemon: 'Heatmor', location: 'Victory Road Outside', method: 'Grass', region: 'Unova', encounter: '100% Sp Atk EV Encounter' },
      { pokemon: 'Litwick', location: 'Celestial Tower', method: '—', region: 'Unova', encounter: '100% Sp Atk EV Encounter' },
      { pokemon: 'Golduck', location: 'Route 11', method: 'Grass', region: 'Unova', encounter: '100% Sp Atk EV Encounter' },
    ],
    spDefense: [
      { pokemon: 'Tentacruel', location: 'Seven Island', method: 'Surf', region: 'Kanto', encounter: '100% Sp Def EV Encounter' },
      { pokemon: 'Dewgong', location: 'Icefall Cave, Four Island', method: '—', region: 'Kanto', encounter: '100% Sp Def EV Encounter' },
      { pokemon: 'Tentacruel', location: 'Route 26', method: 'Surf', region: 'Johto', encounter: '100% Sp Def EV Encounter' },
      { pokemon: 'Tentacruel', location: 'Battle Frontier', method: 'Surf', region: 'Hoenn', encounter: '100% Sp Def EV Encounter' },
      { pokemon: 'Tentacruel', location: 'Victory Road', method: 'Surf', region: 'Sinnoh', encounter: '100% Sp Def EV Encounter' },
      { pokemon: 'Gothorita', location: 'Route 9', method: 'Dark Grass', region: 'Unova', encounter: '100% Sp Def EV Encounter' },
      { pokemon: 'Mantine', location: 'Undella Town', method: 'Surf', region: 'Unova', encounter: '100% Sp Def EV Encounter' },
    ],
    speed: [
      { pokemon: 'Rapidash', location: 'Route 12', method: 'Grass', region: 'Unova', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Pigeotto', location: 'Five Isle Meadow', method: 'Grass', region: 'Kanto', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Poliwhirl', location: 'Blackthorn City', method: 'Surf', region: 'Johto', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Poliwhirl', location: 'Mt. Silver', method: 'Surf', region: 'Johto', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Linoone', location: 'Route 121', method: 'Grass', region: 'Hoenn', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Raticate', location: 'Dreamyard Basement', method: '—', region: 'Unova', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Basculin, Buizel', location: 'Route 11', method: 'Surf', region: 'Unova', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Liepard', location: 'Dreamyard', method: 'Dark Grass', region: 'Unova', encounter: '100% Speed EV Encounter' },
      { pokemon: 'Floatzel, Electabuzz', location: 'Route 222', method: 'Grass', region: 'Sinnoh', encounter: '100% Speed EV Encounter' },
    ]
  };
  

  const handleChange = (stat, value) => {
    value = parseInt(value, 10);
    const currentTotal = Object.values(evs).reduce((sum, ev) => sum + ev, 0);
    const newTotal = currentTotal - evs[stat] + value;

    if (newTotal <= maxEV) {
      const adjustedEvs = { ...evs, [stat]: value };
      const remainingEVs = maxEV - newTotal;

      // Distribute remaining EVs proportionally among other stats
      const otherStats = Object.keys(evs).filter((key) => key !== stat);
      const totalOtherValues = otherStats.reduce((sum, key) => sum + adjustedEvs[key], 0);

      otherStats.forEach((key) => {
        const additional = (remainingEVs * adjustedEvs[key]) / totalOtherValues || 0;
        adjustedEvs[key] = Math.min(255, adjustedEvs[key] + Math.floor(additional));
      });

      setEvs(adjustedEvs);
    } else {
      const excess = newTotal - maxEV;
      const otherStats = Object.keys(evs).filter((key) => key !== stat);
      const totalOtherValues = otherStats.reduce((sum, key) => sum + evs[key], 0);

      const adjustedEvs = { ...evs, [stat]: value };
      otherStats.forEach((key) => {
        const reduction = (excess * evs[key]) / totalOtherValues || 0;
        adjustedEvs[key] = Math.max(0, evs[key] - Math.ceil(reduction));
      });

      setEvs(adjustedEvs);
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    for (const [stat, value] of Object.entries(evs)) {
      if (value > 100) {
        const statData = evTrainingData[stat];
        const regionData = statData.filter((entry) => entry.region === region);
        recommendations.push({ stat, regionData });
      }
    }
    return recommendations;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>POKEMMO Barras de Medición</h1>
        <div style={{ marginTop: '20px', textAlign: 'left', width: '80%' }}>
          <h3>Distribución de EVs</h3>
          <div>
            <label>Selecciona tu región:</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="Unova">Unova</option>
              <option value="Kanto">Kanto</option>
              <option value="Sinnoh">Sinnoh</option>
              <option value="Hoenn">Hoenn</option>
              <option value="Johto">Johto</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="hp">EV PS:</label>
            <input
              id="hp"
              type="range"
              min="0"
              max="252"
              value={evs.hp}
              onChange={(e) => handleChange('hp', e.target.value)}
            />
            <span style={{ marginLeft: '10px' }}>{evs.hp}</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="attack">EV Ataque:</label>
            <input
              id="attack"
              type="range"
              min="0"
              max="252"
              value={evs.attack}
              onChange={(e) => handleChange('attack', e.target.value)}
            />
            <span style={{ marginLeft: '10px' }}>{evs.attack}</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="defense">EV Defensa:</label>
            <input
              id="defense"
              type="range"
              min="0"
              max="252"
              value={evs.defense}
              onChange={(e) => handleChange('defense', e.target.value)}
            />
            <span style={{ marginLeft: '10px' }}>{evs.defense}</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="spAttack">EV At.Esp:</label>
            <input
              id="spAttack"
              type="range"
              min="0"
              max="252"
              value={evs.spAttack}
              onChange={(e) => handleChange('spAttack', e.target.value)}
            />
            <span style={{ marginLeft: '10px' }}>{evs.spAttack}</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="spDefense">EV Def.Esp:</label>
            <input
              id="spDefense"
              type="range"
              min="0"
              max="252"
              value={evs.spDefense}
              onChange={(e) => handleChange('spDefense', e.target.value)}
            />
            <span style={{ marginLeft: '10px' }}>{evs.spDefense}</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="speed">EV Velo:</label>
            <input
              id="speed"
              type="range"
              min="0"
              max="252"
              value={evs.speed}
              onChange={(e) => handleChange('speed', e.target.value)}
            />
            <span style={{ marginLeft: '10px' }}>{evs.speed}</span>
          </div>
          <p style={{ fontWeight: 'bold' }}>
            Total EVs: {Object.values(evs).reduce((sum, ev) => sum + ev, 0)} / {maxEV}
          </p>
          <h3>Recomendaciones de Entrenamiento EV</h3>
          <ul>
            {getRecommendations().map(({ stat, regionData }) => (
              <li key={stat}>
                <strong>{stat.toUpperCase()}:</strong>
                <ul>
                  {regionData.map((entry, index) => (
                    <li key={index}>
                      <strong>Pokémon:</strong> {entry.pokemon} - <strong>Ubicación:</strong> {entry.location} ({entry.method}) - {entry.encounter}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
