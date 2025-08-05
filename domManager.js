import renderDom from "./renderDom.js"



const domManager ={

    updateBoard(board, playerNum){
        renderDom.renderBoard(board, playerNum);
    }
}
export default domManager