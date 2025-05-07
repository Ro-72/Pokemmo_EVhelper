import React, { useState } from 'react';
import recomendations from '../recomend.json';
import '../App.css';

function EVDistribution({ savedPokemon }) {
  const maxEV = 510;
  const [evs, setEvs] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
  });
  const [region, setRegion] = useState('Unova');
  const [showPopup, setShowPopup] = useState(false);

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
    <div className="ev-container" style={{ display: 'flex', gap: '20px' }}>
      <div className="ev-form" style={{ flex: 1 }}>
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
            <button className="close-popup" onClick={togglePopup}>Cerrar</button>
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

        {Object.keys(evs).map((stat) => (
          <div key={stat} style={{ marginBottom: '10px' }}>
            <label htmlFor={stat}>EV {stat.toUpperCase()}:</label>
            <input
              id={stat}
              type="range"
              min="0"
              max="252"
              value={evs[stat]}
              onChange={(e) => handleChange(stat, e.target.value)}
            />
            <span style={{ marginLeft: '10px' }}>{evs[stat]}</span>
          </div>
        ))}

        <p style={{ fontWeight: 'bold' }}>
          Total EVs: {Object.values(evs).reduce((sum, ev) => sum + ev, 0)} / {maxEV}
        </p>
      </div>
      {savedPokemon && (
        <div className="pokemon-info" style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
          <h3>Información del Pokémon Guardado</h3>
          <img src={savedPokemon.sprites.front_default} alt={savedPokemon.name} />
          <p><strong>Nombre:</strong> {savedPokemon.name}</p>
          <p><strong>ID:</strong> {savedPokemon.id}</p>
          <div>
            <h4>Estadísticas:</h4>
            {savedPokemon.stats.map((stat, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <strong>{stat.stat.name.toUpperCase()}:</strong>
                <div style={{ background: '#ddd', width: '100%', height: '10px', position: 'relative' }}>
                  <div
                    style={{
                      background: '#4caf50',
                      width: `${stat.base_stat / 2}%`,
                      height: '100%',
                    }}
                  ></div>
                </div>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EVDistribution;
