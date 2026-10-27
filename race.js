// ===== Roll Dice (Async Function) =====
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// ===== Sorteio de bloco (Switch Case) =====
async function getRandomBlock() {
  const random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

// ===== Itens (Switch Case) =====
async function getRandomItem() {
  return Math.random() < 0.5
    ? { nome: "Casco 🐢", dano: 1 }
    : { nome: "Bomba 💣", dano: 2 };
}

// ===== Log Roll (Encapsulate) =====
async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

// ===== Confronto (If combinado + itens + turbo) =====
async function resolveConfronto(character1, character2) {
  const diceResult1 = await rollDice();
  const diceResult2 = await rollDice();
  const power1 = diceResult1 + character1.PODER;
  const power2 = diceResult2 + character2.PODER;

  console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
  await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
  await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

  if (power1 === power2) {
    console.log("Confronto empatado! Nenhum ponto foi perdido");
    return;
  }

  const winner = power1 > power2 ? character1 : character2;
  const loser = power1 > power2 ? character2 : character1;

  const item = await getRandomItem();
  const lost = Math.min(item.dano, loser.PONTOS);
  loser.PONTOS -= lost;
  console.log(
    `${winner.NOME} venceu e lançou ${item.nome}! ${loser.NOME} perdeu ${lost} ponto(s)`
  );

  // Turbo: 50% de chance de bônus para o vencedor
  if (Math.random() < 0.5) {
    winner.PONTOS++;
    console.log(`${winner.NOME} ganhou um TURBO 🔥 (+1 ponto)`);
  }
}

// ===== Race Engine (Functions Chains) =====
async function playRaceEngine(character1, character2, totalRounds = 5) {
  for (let round = 1; round <= totalRounds; round++) {
    console.log(`🏁 Rodada ${round}`);

    const block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    if (block === "CONFRONTO") {
      await resolveConfronto(character1, character2);
      console.log("-----------------------------");
      continue;
    }

    const diceResult1 = await rollDice();
    const diceResult2 = await rollDice();

    // Ternário: escolhe o atributo conforme o bloco
    const attr = block === "RETA" ? "VELOCIDADE" : "MANOBRABILIDADE";
    const label = block === "RETA" ? "velocidade" : "manobrabilidade";

    const total1 = diceResult1 + character1[attr];
    const total2 = diceResult2 + character2[attr];

    await logRollResult(character1.NOME, label, diceResult1, character1[attr]);
    await logRollResult(character2.NOME, label, diceResult2, character2[attr]);

    if (total1 > total2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (total2 > total1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

// ===== Winner (Else If's) =====
async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("\nA corrida terminou em empate 🤝");
  }
}

module.exports = { playRaceEngine, declareWinner };
