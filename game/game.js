
import Player from "../Player/Player.js"
import shipPlacementController from "./shipPlacementController.js";
import infoDisplay from "./infoText.js";
import coinFlip from "../helper-functions/coinFlip.js";


const game = {

    
    
    
    player1: "",
    player2: "",
    
    currentPlayer: "",
    currentTarget: "",

    winner: "",


    init(){
    this.player1 = new Player("human", 1);
    this.player2 = new Player("ai", 2);

    this.enterStartPhase()
    shipPlacementController.shipyardEvents();
},

addAttackListener(){
    if(this.currentPlayer === this.player2 && this.player2.type === "ai"){
            this.player2.ai.play()
        }
    else{
            this.currentTarget.gameboard.addEventListeners()
        }
},

enterStartPhase(){
    this.player1.gameboard.resetGrid();
    this.player2.gameboard.resetGrid();

    this.player1.gameboard.render();
    this.player1.setShips();

    if(this.player2.type === "ai"){
        this.player2.ai.placeShips()
    };

    this.player2.gameboard.render(true);

    infoDisplay.setText("Place ships");
    shipPlacementController.shipEvents();
},



enterBattlePhase(){
    
    const randomNum = coinFlip();
    if(randomNum === 0){
        this.currentPlayer = this.player1;
        this.currentTarget = this.player2;
    }
    else{
        this.currentPlayer = this.player2;
        this.currentTarget = this.player1;
    };

    infoDisplay.setText(`Turn: Player${this.currentPlayer.num}`);
    this.addAttackListener();
    },

    changeTurns(){
    
        this.player2.gameboard.render(true);
        this.player1.gameboard.render()

        
        this.currentTarget.gameboard.checkGameOver();

        if(!this.winner){
            //swap the current player and current target
            const prevPlayer = this.currentPlayer;
            this.currentPlayer = this.currentTarget;
            this.currentTarget = prevPlayer;
           
        infoDisplay.setText(`Turn: Player${this.currentPlayer.num}`);
        this.addAttackListener()

        }

        
        

        

      
    },

    onGameOver(){
        this.winner = this.currentPlayer;
        infoDisplay.setText(`Winner: Player${this.winner.num}`);
        infoDisplay.createResetBtn();
        
    },

    //Resets the boards, ships, and startphase
    reset(){
        this.winner = "";

        if(this.player2.ai){
            this.player2.ai.reset();
        }
        this.enterStartPhase();
    }



}
export default game;