// ===== Personagens (Setup / Objetos) =====
const characters = [
  { NOME: "Mario",       VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3 },
  { NOME: "Luigi",       VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4 },
  { NOME: "Peach",       VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2 },
  { NOME: "Bowser",      VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5 },
  { NOME: "Yoshi",       VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3 },
  { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5 },
];

// Retorna uma cópia com pontos zerados, para não alterar o original
function createPlayer(name) {
  const found = characters.find(
    (c) => c.NOME.toLowerCase() === String(name).toLowerCase()
  );
  return found ? { ...found, PONTOS: 0 } : null;
}

function pickRandomPlayers() {
  const shuffled = [...characters].sort(() => Math.random() - 0.5);
  return [createPlayer(shuffled[0].NOME), createPlayer(shuffled[1].NOME)];
}

module.exports = { characters, createPlayer, pickRandomPlayers };
