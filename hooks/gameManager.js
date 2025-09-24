import { useState, useEffect } from "react";
export default function useGameManager() {
    const heroiInicial = { 
    vida: 100, 
    nome: "Luffy", 
    imagem: "/luffy.png" 
};
    const vilaoInicial = { 
    vida: 100, 
    nome: "Zoro", 
    imagem: "/zoro2.png" 
};

    
    const [heroi, setHeroi] = useState(heroiInicial);
    const [vilao, setVilao] = useState(vilaoInicial);
    const [log, setLog] = useState([]);
    const [turnoHeroi, setTurnoHeroi] = useState(true);
    const [vencedor, setVencedor] = useState(null);

    useEffect(() => {
        if (vilao.vida <= 0) {
            setVencedor("Herói");
            adicionarLog(`${vilao.nome} foi derrotado! Parabéns, ${heroi.nome}!`);
            
        } else if (heroi.vida <= 0) {
            setVencedor("Vilão");
            adicionarLog(`${heroi.nome} foi derrotado.`);
        }
    }, [heroi.vida, vilao.vida]);


    
    const modificarVida = (alvo, dano) => {
        const setter = alvo === "heroi" ? setHeroi : setVilao;
        setter(prev => {
            const novaVida = Math.max(0, prev.vida - dano); 
            return { ...prev, vida: novaVida };
        });
    };

    const adicionarLog = (mensagem) => {
        setLog(prev => [mensagem, ...prev]);
    };

    const executarTurnoVilao = () => {
        if (heroi.vida <= 0) return; 


        const danosPossiveis = [10, 20];
        const danoAleatorio = danosPossiveis[Math.floor(Math.random() * danosPossiveis.length)];
        
        modificarVida("heroi", danoAleatorio);
        adicionarLog(`${vilao.nome} contra-ataca ${heroi.nome} causando ${danoAleatorio} de dano!`);
        
       
        setTurnoHeroi(true);
    };


    
    const acoes = {
        atacar: () => {
            modificarVida("vilao", 30);
            adicionarLog(`${heroi.nome} atacou ${vilao.nome} causando 10 de dano.`);
        },
        defender: () => {
            modificarVida("heroi", 15); 
            adicionarLog(`${heroi.nome} defendeu e sofreu menos dano.`);
        },
        usarPocao: () => {
            modificarVida("heroi", -50); 
            adicionarLog(`${heroi.nome} usou uma poção e recuperou 50 de vida.`);
        },
        correr: () => {
            adicionarLog(`${heroi.nome} tentou fugir, mas não conseguiu!`);
           const vetor = [1, 2, 3];
           const aux = Math.floor(Math.random() * 4);
           console.log(vetor)
           console.log('Aux: ' + aux)
            vetor[Math.floor(Math.random() * vetor.length)];
            if(aux === 3) {
                alert("Você deu sorte e consegui fugir!");
                window.location.reload()
            } else{
                alert("Você não pode fugir!");
            }
            
        }
    };


    
    const handlerAcaoHeroi = (acao) => {
        
        if (!turnoHeroi || vencedor) return;

        acoes[acao]?.();
        setTurnoHeroi(false); 

        
        setTimeout(() => {
            
            setVilao(vilaoAtual => {
                if (vilaoAtual.vida > 0) {
                    executarTurnoVilao();
                } else {
                    
                    setTurnoHeroi(true);
                }
                return vilaoAtual; 
            });
        }, 2000);
    };

    return {
        heroi,
        vilao,
        log,
        turnoHeroi,
        vencedor,
        handlerAcaoHeroi
    };
}