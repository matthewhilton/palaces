import { Card } from "react-bootstrap"

const PlaceCard = ({ data, children, showOrder = true }) => (
    <Card className="m-2">
        <Card.Body>
            <Card.Title>{showOrder && <>{data.order}.</>} <b>{data.description}</b></Card.Title>
            <Card.Text>
                <p><b> πΊοΈ {data.mnemonic}</b> relates to <b> <br />
                π {data.foreignWord}</b> which means <b> <br /> 
                π {data.translation}</b> </p>
            </Card.Text>
            <Card.Footer>
                {children}
            </Card.Footer>
        </Card.Body>
    </Card>
)

export default PlaceCard 