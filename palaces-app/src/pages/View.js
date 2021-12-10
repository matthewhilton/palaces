import { useParams } from 'react-router-dom';
import accountAtomData from '../data/accountDataAtom';
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import PalaceCreator from '../components/PalaceCreator';

const View = () => {
    const { id } = useParams();
    const [data, setData] = useRecoilState(accountAtomData)

    useEffect(async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                password: prompt("enter password"),  // TODO store password
            })
        }
            
        const res = await fetch('http://localhost:7071/api/GetAccountData', options)
        const json = await res.json()

        if(res.status === 200) {
            setData(json)
        }
    }, [id])

    const sync = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                password: prompt("enter password"),  // TODO store password
                places: data.places
            })
        }
            
        const res = await fetch('http://localhost:7071/api/AccountDataUpdate', options)

        if(res.status == 200) {
            window.alert("Synced successfully")
        } else {
            window.alert("Failed to sync")
        }
    }

    return (
        <div>
            <p> Account ID: {id} </p>
            <button onClick={sync}>sync with cloud</button> 
            <PalaceCreator />
        </div>
    )
}

export default View