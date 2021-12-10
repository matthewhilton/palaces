import { useState, useEffect } from "react"

const Revealable = ({whenHidden, whenRevelealed}) => {
    const [revealed, setRevealed] = useState(false)
    
    useEffect(() => {
        setRevealed(false)
    }, [whenHidden, whenRevelealed])

    return revealed ? <div> {whenHidden} {whenRevelealed} </div> : <div> <button onClick={() => setRevealed(true)}> Reveal </button> {whenHidden} </div>
}

export default Revealable