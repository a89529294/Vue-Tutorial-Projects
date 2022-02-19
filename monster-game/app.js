function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    playerBarStyles() {
      return { width: this.playerHealth < 0 ? "0%" : this.playerHealth + "%" };
    },
    monsterBarStyles() {
      return {
        width: this.monsterHealth < 0 ? "0%" : this.monsterHealth + "%",
      };
    },
    shouldDisableSpecialAttack() {
      return this.currentRound % 3;
    },
  },
  watch: {
    monsterHealth() {
      if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
        this.winner = "tie";
      } else if (this.playerHealth <= 0) {
        this.winner = "monster";
      } else if (this.monsterHealth <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
      this.currentRound++;
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 22);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.addLogMessage("player", "attack", attackValue);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      this.playerHealth =
        this.playerHealth + healValue > 100
          ? 100
          : this.playerHealth + healValue;
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
      this.currentRound++;
    },
    reset() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
}).mount("#game");
