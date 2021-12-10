import { Link, Route, Routes, useParams } from 'react-router-dom';
import accountAtomData from '../data/accountDataAtom';
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import PalaceCreator from '../components/PalaceCreator';
import Edit from './Edit';
import Play from './Play';
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
                id,
                password: prompt("enter password"),  // TODO store password
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
        <div>
            <SyncButton />
            <p> Account ID: {data.id} </p>
            <p> Palace Name: {data.name} </p>
            <Link to="edit">Edit</Link>
            <Link to="play">Play</Link>

            <Routes>
                <Route path="/edit" element={<Edit />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </div>
    )
}

export default View