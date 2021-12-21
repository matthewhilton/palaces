import PalaceInputLink from "../components/PalaceInputLink";
import Signup from "./Signup";

const Landing = () => (
    <div>
        <h1> Gjennom helps you memorise better </h1>
        <p> <b> Memory Palaces </b> are one of the most effective tools to memorise things. </p>
        <p> <i> Gjennom helps you make them. </i> </p>

        <h2> Create new palace </h2>
        <Signup />

        <h2> Load existing palace </h2>
        <PalaceInputLink />
    </div>
    
)

export default Landing