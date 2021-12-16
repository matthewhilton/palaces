import { Link, Route, Routes, useParams } from 'react-router-dom';
import accountAtomData from '../data/accountDataAtom';
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import PalaceCreator from '../components/PalaceCreator';
import Edit from './Edit';
import Play from './Play';
import { Button, Badge, Container } from "react-bootstrap"
import SyncButton from '../components/SyncButton';
import { useNavigate } from "react-router-dom";

const View = () => {
    const { id } = useParams();
    const [data, setData] = useRecoilState(accountAtomData)
    const navigate = useNavigate();

    useEffect(async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id
            })
        }

        const res = await fetch(process.env.REACT_APP_PROD_API ? '/api/GetAccountData' : 'http://localhost:7071/api/GetAccountData', options)
        const json = await res.json()

        if (res.status === 200) {
            setData(json)
        } else {
            window.alert(json.error)
            navigate("/")
        }
    }, [id])

    return (
        <Container>
            <h1>🏰 {data.name} </h1>

            <Badge bg="info">
                Save this page to access your palace
            </Badge>

            <div>
                <Link to="play"><Button>Play</Button></Link>
                <Link to="edit"><Button variant="warning">Edit</Button></Link>
            </div>

            <Routes>
                <Route path="/edit" element={<Edit />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </Container>
    )
}

export default View