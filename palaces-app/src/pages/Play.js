import { useRecoilState } from "recoil"
import accountAtomData from '../data/accountDataAtom';
import { useState } from "react"
import { sortBy } from "lodash"
import PlaceQuizCard from "../components/PlaceQuizCard";
import PlaceCard from "../components/display/PlaceCard";
import { Badge, Button, Stack } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom'

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
                <Stack direction="vertical" gap={1}>
                    <PlaceQuizCard data={places[step]} />
                    <Stack direction="horizontal" gap={1}>
                        <Button variant="danger" onClick={() => score(false)}> Incorrect </Button>
                        <Button variant="success" onClick={() => score(true)}> Correct </Button>
                    </Stack>
                </Stack>
            </div>
        )
    } else {
        return GameReview(places, responses)
    }

}

const GameReview = (places, outcomes) => {
    const { id } = useParams();

    return (
        <div>
            {places.map((place, i) =>
                <div>
                    <PlaceCard data={place} showOrder={false}>
                        {outcomes[i] ?
                            <Badge bg='success'>
                                Correct
                            </Badge>
                            :
                            <Badge bg='danger'>
                                Incorrect
                            </Badge>
                        }
                    </PlaceCard>
                </div>
            )}

            <Link to={"/" + id}> <Button> Done </Button> </Link>
        </div>
    )
}

export default Play