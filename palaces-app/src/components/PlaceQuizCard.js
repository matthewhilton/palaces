import { Card } from "react-bootstrap"
import Revealable from "./Revealable"

const PlaceQuizCard = ({ data }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>
                <Revealable whenHidden={"Location"} whenRevelealed={data.description}/>
                </Card.Title>
            <Card.Text>
                <Revealable whenHidden={"Mnemonic"} whenRevelealed={<p>{data.mnemonic}</p>}/>
                <Revealable whenHidden={"Foreign Word"} whenRevelealed={<p>{data.foreignWord}</p>}/>
                <Revealable whenHidden={"Translation"} whenRevelealed={<p>{data.translation}</p>}/>
            </Card.Text>
        </Card.Body>
    </Card>
)

export default PlaceQuizCard 