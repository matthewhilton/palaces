import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

const Revealable = ({whenHidden, whenRevelealed, forceReveal=null}) => {
    const [revealed, setRevealed] = useState(false)
    
    useEffect(() => {
        setRevealed(false)
    }, [whenHidden, whenRevelealed])

    return revealed || forceReveal === true ? <div> {whenRevelealed} </div> : <div className="mb-2"> <Button variant="secondary" onClick={() => setRevealed(true)}> Reveal </Button> {whenHidden} </div>
}

export default Revealable