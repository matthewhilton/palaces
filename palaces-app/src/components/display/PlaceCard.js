import { Card } from "react-bootstrap"

const PlaceCard = ({ data, color = 'light', children, showOrder = true }) => (
    <Card style={{ width: '18rem' }} border={color} bg="light" className="m-2">
        <Card.Body>
            <Card.Title>{data.description}</Card.Title>
            <Card.Text>
                <p><b> 🗺️ {data.mnemonic}</b> relates to <b> <br />
                🌎 {data.foreignWord}</b> which means <b> <br /> 
                📜 {data.translation}</b> </p>
            </Card.Text>
            {showOrder &&
                <Card.Text>
                    <p> Order: {data.order} </p>
                </Card.Text>
            }

            {children}
        </Card.Body>
    </Card>
)

export default PlaceCard 