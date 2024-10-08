import { useEffect, useState } from "react";
import BlankSlateCard from "./BlankSlateCard";
import { BlankSlateGamePropsTypes } from "./Types";

export default function BlankSlateGame({blankSlateCardIndex, blankSlateCard, totalBlankSlateCards}: BlankSlateGamePropsTypes) {
    const [isFlipped, setIsFlipped] = useState(false);
    const finalCard = blankSlateCardIndex === totalBlankSlateCards;
    const finalFlip = finalCard && isFlipped;

    useEffect(() => {
        handleAudioPlayOnCard();
    }, [finalCard]);

    useEffect(() => {
        setVisualsForFinalFlip();
    }, [finalFlip]);

    async function playAudio(audioElem: HTMLAudioElement) {
        await audioElem.play();
    }

    function handleAudioPlayOnCard() {
        // Setups audio event listener
        if (finalCard) {
            const audioElem: HTMLAudioElement = document.getElementById("audio") as HTMLAudioElement;
            const blankSlateCardEl = document.querySelector(".blank-slate-card");
            blankSlateCardEl?.addEventListener("click", () => playAudio(audioElem), false);
        }
    }

    function setVisualsForFinalFlip() {
        if (finalFlip) {
            // Changes the background to falling petals when final card is 
            // flipped to the back side.
            document.body.style.backgroundImage =
                "url(../falling_petals.gif)";
        } else {
            // Reverts the background to gradient pink hue when final card is 
            // flipped to frontside.
            document.body.style.background =
                "linear-gradient(179.4deg, rgb(253, 240, 233) 2.2%, rgb(255, 194, 203) 96.2%)";
        }
    }

    return (
        <div className="game-container">
            <audio
                id="audio"
                loop={true}
                src="../Mitski - My Love Mine All Mine-Clipped.mp3"
            ></audio>
            {finalFlip ? (
                <>
                <div>
                    <img
                    src="../peony_flower.gif"
                    alt="final-flip-gif"
                    className="peony-flower-gif"
                    />
                </div>
                </>
            ) : null}
            <div>
                <div
                    className={`blank-slate-card ${isFlipped ? "flipped" : ""} ${finalFlip ? "final-flip" : ""}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                <BlankSlateCard
                    blankSlateCard={blankSlateCard}
                    isFinalFlip={finalFlip}
                />
                </div>
            </div>
        </div>
    );

}