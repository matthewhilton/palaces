import { Card } from "react-bootstrap"

const PlaceCard = ({ data }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{data.description}</Card.Title>
            <Card.Text>
                <p> <b>{data.mnemonic}</b> means <b>{data.foreignWord}</b> means <b>{data.translation}</b> </p>
            </Card.Text>
        </Card.Body>
    </Card>
)

export default PlaceCard