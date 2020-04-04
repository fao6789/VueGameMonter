new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monterHealth: 100,
        gameisRunning: false,
        logTurn: [],
        numberHeal: 10,
    },
    methods: {
        startNewGame() {
            this.gameisRunning = true;
            this.playerHealth = 100;
            this.monterHealth = 100;
            this.logTurn = [];

        },
        attack() {
            if (this.checkPlayerOption()) {
                return;
            }
            //monter
            var damage = this.inputDamage(4, 10);
            this.monterHealth -= damage;
            this.logTurn.unshift({
                isPlayer: true,
                textLog: 'Player hits Monter for ' + damage
            });
            //player
            this.monterAttack();
        },
        specialAttack() {
            if (this.checkPlayerOption()) {
                return;
            }
            //monter
            var damage = this.inputDamage(10, 20);
            this.monterHealth -= damage;
            this.logTurn.unshift({
                isPlayer: true,
                textLog: 'Player hits Monter for ' + damage
            });
            //player
            this.monterAttack();
        },
        heal() {
            if (this.playerHealth > 70) {
                return false;
            }
            else if (this.playerHealth <= 60) {
                this.playerHealth += this.numberHeal;
            }
            else {
                this.playerHealth = 70;
            }
            this.logTurn.unshift({
                isPlayer: true,
                textLog: 'Player heal for ' + this.numberHeal,
            });
            this.monterAttack();
        },
        giveUp() {
            if (confirm('YOU LOST! You want stop game ?')) {
                this.startNewGame();
            }
            else {
                return false;
            }
        },
        monterAttack() {
            var damage = this.inputDamage(5, 12);
            this.playerHealth -= damage;
            this.logTurn.unshift({
                isPlayer: false,
                textLog: 'Monster hits Player for ' + damage
            });
            this.checkPlayerOption();
        },
        inputDamage(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage + 1, minDamage));
        },
        checkPlayerOption() {
            if (this.playerHealth <= 0) {
                if (confirm('YOU LOST! New game ?')) {
                    this.startNewGame();
                    // this.gameisRunning = true;
                }
                else {
                    this.gameisRunning = false;
                }
                return true;
            }

            else if (this.monterHealth <= 0) {
                if (confirm('YOU WON! New game ?')) {
                    this.startNewGame();
                    // this.gameisRunning = false;
                }
                else {
                    this.gameisRunning = false;
                }
                return true;
            }
            return;
        },


    },
});