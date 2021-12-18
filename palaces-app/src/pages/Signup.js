import CreateLinkForm from "../components/CreateLinkForm"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    return <div>
        <CreateLinkForm onNewLink={(id) => navigate("/" + id)} />
        </div>
}

export default Signup