const roll = function (max) {
  return Math.floor(Math.random()*max) + 1;
}
var vm = new Vue({
  el: '#app',
  data: {
    currentUnit: {
      name: 'Click REROLL',
      max: 0
    },
    currentEnemy: {
      name: 'Tutorial Goblin',
      max: 4,
      id: 0
    },
    battleMode: false,
    gameover: true,
    playerRoll: 0,
    enemyRoll: 0,
    enemySet: [],
    totalRerolls: 0,
    victoryCount: 0
  },
  methods: {
    battle: function () {
      // console.log(...enemies);
      if (!this.battleMode && !this.gameover) {
        this.battleMode = true;
        this.reset();
        this.battle();
      } else if (this.battleMode ) {
        this.currentEnemy = this.enemySet.shift();
        // this.playerRoll = roll(this.currentUnit.max);
        this.playerRoll = 21;
        this.enemyRoll = roll(this.currentEnemy.max);
        if (this.playerRoll > this.enemyRoll) {
          this.result = 'Victory, you move on in the event!'
          this.checkVictory();
        } else if (this.playerRoll < this.enemyRoll) {
          this.gameover = true;
          this.result = 'You lost. This account is worthless. Either reroll or rage quit.'
        } else {
          this.result = 'A close match... but you won!'
          this.checkVictory();
        }
      }
    },
    checkVictory: function () {
      if ( this.enemySet.length === 0 ) {
        this.gameover = true;
        // this.battleMode = false;
        this.victoryCount++;
        this.result = this.result +' AND YOU WON IT ALL! CONGRATS!';
      }
    },
    reroll: function () {
      this.battleMode = false;
      this.gameover = false;
      this.reset();
      this.totalRerolls++;
      let random = roll(10);
      switch (random) {
        case 1:
          this.currentUnit.name = 'EXP fodder';
          this.currentUnit.max = 4;
        break;
        case 2:
        case 3:
          this.currentUnit.name = 'A Lizard with a Bow or Something';
          this.currentUnit.max = 6;
        break;
        case 4:
        case 5:
          this.currentUnit.name = 'Fancy Carl';
          this.currentUnit.max = 8;
        break;
        case 6:
        case 7:
          this.currentUnit.name = 'Nearly Naked Knight';
          this.currentUnit.max = 10;
        break;
        case 8:
        case 9:
          this.currentUnit.name = 'Facestab, Master Assassin';
          this.currentUnit.max = 12;
        break;
        case 10:
          this.currentUnit.name = 'Omega Poseidon, Breaker of Balance';
          this.currentUnit.max = 20;
        break;
      }
      
    },
    reset: function () {
      this.enemySet = [
        {
          name: 'Tutorial Goblin',
          max: 4
        },
        {
          name: 'Three Day Old Account',
          max: 6
        },
        {
          name: 'A Elf Firing Two Bows Somehow',
          max: 8
        },
        {
          name: 'On-meta Sword Person',
          max: 10
        },
        {
          name: '\'FTP, BTW\' Golem',
          max: 12
        },
        {
          name: 'The Ultra Whale',
          max: 20
        }
      ];
    },
  }
})