import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import accountAtomData from '../data/accountDataAtom';
import { v4 as uuidv4 } from 'uuid';
import PlaceCard from "./display/PlaceCard";
import { Col, Container, Row } from "react-bootstrap";

const PlacesEditor = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [data, setData] = useRecoilState(accountAtomData)

    if (!data) {
        return "No data"
    }

    const onSubmit = async formData => {
        const placeData = {
            id: uuidv4(),
            ...formData
        }

        const newDataState = {
            ...data,
            places: [
                ...data.places,
                placeData
            ]
        }

        setData(newDataState)
    };

    console.log(data)

    return (
        <div>
            <h2> Places Editor </h2>
            <Container>
                <Row>
                    <Col>
                        <h3> Current Places </h3>
                        {data.places.map(place => <PlaceCard data={place} />)}
                    </Col>
                    <Col>
                        <h3> New Place </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p> Where in palace </p>
                            <input {...register("description")} />

                            <p> Mnemonic / Imagery </p>
                            <input {...register("mnemonic")} />

                            <p> Word in Foreign Language </p>
                            <input {...register("foreignWord")} />

                            <p> Translation </p>
                            <input {...register("translation")} />

                            <input type="submit" />
                        </form>
                    </Col>
                </Row>
            </Container>



        </div>
    )
}

export default PlacesEditor