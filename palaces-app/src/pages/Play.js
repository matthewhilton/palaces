import { useRecoilState } from "recoil"
import accountAtomData from '../data/accountDataAtom';
import { useState } from "react"
import { sortBy } from "lodash"
import PlaceQuizCard from "../components/PlaceQuizCard";
import PlaceCard from "../components/display/PlaceCard";

const Play = () => {
    const [data, setData] = useRecoilState(accountAtomData)

    const [step, setStep] = useState(0)
    const [responses, setResponses] = useState([])

    const places = sortBy(data.places, "order")

    const score = outcome => {
        // Record correct/incorrect
        setResponses([
            ...responses,
            outcome
        ])

        // Move to next card
        setStep(step + 1)
    }

    if (step < places.length) {
        return (
            <div>
                <h1>Play</h1>
                <p> Progress: {step} / {places.length} </p>

                <PlaceQuizCard data={places[step]} />
                <button onClick={() => score(true)}> Correct </button>
                <button onClick={() => score(false)}> Incorrect </button>
            </div>
        )
    } else {
        return GameReview(places, responses)
    }

}

const GameReview = (places, outcomes) => (
    <div>
        {places.map((place, i) =>
            <div>
                <PlaceCard data={place} color={outcomes[i] ? 'success' : 'danger'} />
            </div>
        )}
    </div>
)

export default Play