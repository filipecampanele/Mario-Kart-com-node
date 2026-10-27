const { characters, createPlayer, pickRandomPlayers } = require("./players");
const { playRaceEngine, declareWinner } = require("./race");

// ===== Main (Auto Invoke) =====
// Uso: node index.js              -> sorteia 2 personagens
//      node index.js Mario Bowser -> escolhe os corredores
(async function main() {
  const [arg1, arg2] = process.argv.slice(2);
  let player1, player2;

  if (arg1 && arg2) {
    player1 = createPlayer(arg1);
    player2 = createPlayer(arg2);

    if (!player1 || !player2 || player1.NOME === player2.NOME) {
      console.log("Personagens inválidos. Opções:");
      console.log(characters.map((c) => c.NOME).join(", "));
      return;
    }
  } else {
    [player1, player2] = pickRandomPlayers();
  }

  // Start (Template String)
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
