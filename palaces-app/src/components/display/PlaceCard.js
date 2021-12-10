import { Card } from "react-bootstrap"

const PlaceCard = ({ data, color='light' }) => (
    <Card style={{ width: '18rem' }} border={color} bg="light" className="m-2">
        <Card.Body>
            <Card.Title>{data.description}</Card.Title>
            <Card.Text>
                <p> <b>{data.mnemonic}</b> means <b>{data.foreignWord}</b> means <b>{data.translation}</b> </p>
            </Card.Text>
            <Card.Text>
                <p> Order: {data.order} </p>
            </Card.Text>
        </Card.Body>
    </Card>
)

export default PlaceCard 