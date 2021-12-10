import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import accountAtomData from '../data/accountDataAtom';
import { v4 as uuidv4 } from 'uuid';
import PlaceCard from "./display/PlaceCard";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { sortBy } from "lodash"

const PlacesEditor = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [data, setData] = useRecoilState(accountAtomData)

    if (!data) {
        return "No data"
    }

    const onSubmit = async formData => {
        const placeData = {
            id: uuidv4(),
            order: data.places.length,
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

    const moveDirection = (placeId, direction) => {
        const placeToMove = data.places.find(place => place.id == placeId)

        const newOrdering = placeToMove.order + direction

        // Already at bounds, do nothing
        if(newOrdering < 0 || newOrdering > data.places.length - 1) {
            return
        }

        // Find the one in the existing place
        const placeToSwapWith = data.places.find(place => place.order == placeToMove.order + direction)
        
        // Swap their order values
        const swappedPlaces = data.places
            // Modify the one we are moving
            .map(p => p.id === placeToMove.id ? {
                ...placeToMove,
                order: placeToSwapWith.order
            } : p) 
            // Modify the one we are swapping with
            .map(p => p.id === placeToSwapWith.id ? {
                ...placeToSwapWith,
                order: placeToMove.order
            } : p)
        
        const newDataState = {
            ...data,
            places: swappedPlaces
        }

        setData(newDataState)
    }

    const deletePlace = placeId => {
        const filteredPlaces = data.places.filter(p => p.id !== placeId)

        // Find those with a greater order and reduce it by 1
        const placeToDelete = data.places.find(p => p.id == placeId)
        const affectedPlaces = data.places.filter(p => p.order > placeToDelete.order)
        const affectedPlacesIds = affectedPlaces.map(p => p.id)

        // Remove 1 if was affected, else don't do anything
        const updatedPlaces = filteredPlaces.map(p => affectedPlacesIds.includes(p.id) ? {
            ...p,
            order: p.order - 1
        } : p)

        const newDataState = {
            ...data,
            places: updatedPlaces
        }

        setData(newDataState)
    }

    const places = sortBy(data.places.slice(), "order")

    return (
        <div>
            <h2> Places Editor </h2>
            <Container>
                <Row>
                    <Col>
                        <h3> Current Places </h3>
                        {places.map(place =>
                            <Stack direction="horizontal">
                                <button onClick={() => moveDirection(place.id, -1)}> Up </button>
                                <button onClick={() => moveDirection(place.id, 1)}> Down </button>
                                <button onClick={() => deletePlace(place.id)}> Delete </button>
                                <PlaceCard data={place} />
                            </Stack>)}
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