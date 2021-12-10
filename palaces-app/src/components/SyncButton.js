import { useRecoilState } from "recoil"
import accountAtomData from '../data/accountDataAtom';

const SyncButton = () => {
    const [data, setData] = useRecoilState(accountAtomData)

    const sync = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: data.id,
                password: prompt("enter password"),  // TODO store password
                places: data.places
            })
        }

        const res = await fetch(process.env.REACT_APP_PROD_API ? 'https://palaces-app-apim.azure-api.net/palaces-app/AccountDataUpdate' : 'http://localhost:7071/api/AccountDataUpdate', options)

        if (res.status == 200) {
            window.alert("Synced successfully")
        } else {
            window.alert("Failed to sync")
        }
    }

    return <button onClick={sync}>sync with cloud</button>
}

export default SyncButton