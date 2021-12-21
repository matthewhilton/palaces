import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

const PalaceInputLink = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async data => {
        navigate(`/${data.id}`)
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
          <p> Palace ID </p>
          <input {...register("id")} />
          <br />
          <Button type="submit"> Load Palace </Button>
        </form>
    )
}

export default PalaceInputLink