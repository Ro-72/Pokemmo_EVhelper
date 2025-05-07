import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import recomendations from './recomend.json'; // Import recomend.json

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
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
        const statData = recomendations[stat];
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
          <h3>
            Distribución de EVs
            <span
              className="recommendation-icon"
              onClick={togglePopup}
              title="Ver recomendaciones"
            >
              ℹ️
            </span>
          </h3>
          {showPopup && (
            <div className="recommendation-popup smallpopup">
              <h4>Recomendaciones</h4>
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
              <button className="close-popup" onClick={togglePopup}>
                Cerrar
              </button>
            </div>
          )}
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
