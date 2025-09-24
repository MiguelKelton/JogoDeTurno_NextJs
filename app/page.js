'use client';

import useGameManager from '../hooks/gameManager';
import styles from './page.module.css';
import './globals.css';



export default function GamePage() {
    const { heroi, vilao, log, handlerAcaoHeroi, vencedor, turnoHeroi } = useGameManager();

    return (
        <div className="game-container">
            <h1 className="game-title">Batalha Final</h1>

            {vencedor && (
                <div className="vencedor-banner">
                    <h2>FIM DE JOGO!</h2>
                    <p>Vencedor: {vencedor}</p>
                </div>
            )}

            <div className="battlefield">
                {/* Card do Herói */}
                <div className="player-card">
                    <h2>{heroi.nome}</h2>
                    <img src={heroi.imagem} alt={`Imagem de ${heroi.nome}`} className="player-image" />
                    <div className="health-bar-container">
                        <div 
                            className="health-bar" 
                            style={{ width: `${heroi.vida}%` }}
                        ></div>
                    </div>
                    <p>Vida: {heroi.vida} / 100</p>
                </div>

                <div className="turn-indicator">
                    {!vencedor && (turnoHeroi ? 'SEU TURNO' : 'TURNO DO VILÃO...')}
                </div>

                {/* Card do Vilão */}
                <div className="player-card">
                    <h2>{vilao.nome}</h2>
                    <img src={vilao.imagem} alt={`Imagem de ${vilao.nome}`} className="player-image" />
                    <div className="health-bar-container">
                        <div 
                            className="health-bar" 
                            style={{ width: `${vilao.vida}%`, backgroundColor: '#c92a2a' }}
                        ></div>
                    </div>
                    <p>Vida: {vilao.vida} / 100</p>
                </div>
            </div>

            <div className="actions-panel">
                <button onClick={() => handlerAcaoHeroi('atacar')} disabled={!turnoHeroi || vencedor}>Atacar</button>
                <button onClick={() => handlerAcaoHeroi('defender')} disabled={!turnoHeroi || vencedor}>Defender</button>
                <button onClick={() => handlerAcaoHeroi('usarPocao')} disabled={!turnoHeroi || vencedor}>Curar</button>
                <button onClick={() => handlerAcaoHeroi('correr')} disabled={!turnoHeroi || vencedor}>Correr</button>
                <button onClick={() => window.location.reload()}>Reiniciar Jogo</button>
            </div>

            <div className="log-container">
                <h3>Log de Batalha</h3>
                <ul className="log-list">
                    {log.map((mensagem, index) => (
                        <li key={index}>{mensagem}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
