import { Button, Card } from "react-bootstrap"
import Revealable from "./Revealable"
import { useState, useEffect } from "react"

const PlaceQuizCard = ({ data }) => {
    const [allRevealed, setAllRevealed] = useState(false)

    useEffect(() => {
        setAllRevealed(false);
    }, [data])

    return( 
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>
                <Revealable whenHidden={"Location"} whenRevelealed={data.description} forceReveal={allRevealed}/>
                </Card.Title>
            <Card.Text>
                <Revealable whenHidden={"Mnemonic"} forceReveal={allRevealed} whenRevelealed={<p>{data.mnemonic}</p>}/>
                <Revealable whenHidden={"Foreign Word"} forceReveal={allRevealed} whenRevelealed={<p>{data.foreignWord}</p>}/>
                <Revealable whenHidden={"Translation"} forceReveal={allRevealed} whenRevelealed={<p>{data.translation}</p>}/>

                <Button onClick={() => setAllRevealed(true)}> Reveal All </Button> 
            </Card.Text>
        </Card.Body>
    </Card>
    )
}

export default PlaceQuizCard 