
import Player from "../Player/Player.js"
import shipPlacementController from "./shipPlacementController.js";
import infoDisplay from "./infoText.js";


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



enterStartPhase(){
    this.player1.gameboard.resetGrid();
    this.player2.gameboard.resetGrid();

    this.player1.gameboard.render();
    this.player1.setShips();

    if(this.player2.type === "ai"){
        this.player2.ai.placeShips()
    }
    this.player2.gameboard.render(true);
    shipPlacementController.shipEvents();
},



enterBattlePhase(){
    

    
    this.currentPlayer = this.player1
    this.currentTarget = this.player2
    
    this.currentTarget.gameboard.addEventListeners()
    },

    changeTurns(){
    
        this.player2.gameboard.render(true);
        this.player1.gameboard.render()

        
        this.currentTarget.gameboard.checkLoss();

        if(!this.winner){
            //swap the current player and current target
            const prevPlayer = this.currentPlayer;
            this.currentPlayer = this.currentTarget;
            this.currentTarget = prevPlayer;
           
            
    
            if(this.currentPlayer === this.player2 && this.player2.type === "ai"){
                this.player2.ai.play()
            }
            else{
                this.currentTarget.gameboard.addEventListeners()
            }

        }

        
        

        

      
    },

    onLoss(){
        this.winner = this.currentPlayer;
        infoDisplay.setText(`Winner: Player${this.winner.num}`);
        infoDisplay.createResetBtn();
        
    },

    //Resets the boards, ships, and startphase
    reset(){
        alert("Wah");
        this.winner = "";

        if(this.player2.ai){
            this.player2.ai.reset();
        }
        this.enterStartPhase();
    }



}
export default game;