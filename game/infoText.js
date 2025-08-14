
import game from "./game.js";

const infoContainer = document.querySelector("#info-container");


const infoDisplay = {

    setText(text){
        const tag = infoContainer.querySelector("h2");
        tag.textContent = text;
    },

    createResetBtn(){
        const resetBtn = document.createElement("button");
        resetBtn.classList.add("reset-btn");
        resetBtn.textContent = "Reset"

        infoContainer.appendChild(resetBtn);

        resetBtn.addEventListener("click", () => {
            game.reset();
            resetBtn.remove();
        })
    },

   
}

export default  infoDisplay