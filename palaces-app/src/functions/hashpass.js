import {sha256} from "js-sha256"

const hashPassword = (plaintext) => {
    return(sha256(plaintext))
}

export default hashPassword