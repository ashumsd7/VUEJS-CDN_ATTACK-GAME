new Vue({
  el: "#app",
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns:[]
    };
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    //when attacks
    attack() {
      this.monsterHealth -= this.calculateDamage(3, 10);
         //logging attacks
      this.turns.unshift({
          isPlayer: true,
           text: 'Player hits Monster for >>'+  this.calculateDamage(3, 10)
      })
      if (this.checkWin()) {
        return;
      }

      this.playerHealth -= this.calculateDamage(5, 12);
      //logging attacks
      this.turns.unshift({
        isPlayer: false,
         text: 'Monster hits Player for >>'+  this.calculateDamage(5, 12)
    })
      this.checkWin();
    },

    //when special attacks
    specialAttack() {
      this.monsterHealth -= this.calculateDamage(10, 20);
      this.turns.unshift({
        isPlayer: true,
         text: 'Player hits hard Monster for >>'+  this.calculateDamage(10, 20)
    })
      if (this.checkWin()) {
        return;
      }
      this.playerHealth -= this.calculateDamage(5, 12);
      this.turns.unshift({
        isPlayer: false,
         text: 'Monster hits Player for >>'+  this.calculateDamage(5, 12)
    })
      
      this.checkWin();
    },

    //when heals
    heal() {
        if(this.playerHealth<=90){
            this.playerHealth+=10;
            this.turns.unshift({
                isPlayer: true,
                 text: 'Player heals by 10'
            })
        }else{
            
            this.playerHealth=100;
            this.turns.unshift({
                isPlayer: true,
                 text: 'Player is healing less than 10'
            })
          
        }
        this.playerHealth -= this.calculateDamage(5, 12);
        this.turns.unshift({
            isPlayer: false,
             text: 'Monster hits Player for >>'+  this.calculateDamage(5, 12)
        })
        this.checkWin();
       
    },
    //when giveup
    giveUp() {
        this.gameIsRunning= false;
        this.turns=[];
        //i added
        this.playerHealth=100;
        this.monsterHealth=100;
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm("you Won, New Game")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("you Lost, New Game")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
