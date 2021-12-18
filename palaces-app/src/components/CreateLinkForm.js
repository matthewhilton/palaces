import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import hashPassword from "../functions/hashpass";

const CreateLinkForm = ({onNewLink}) => {

    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        // Setup request
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: hashPassword(data.password),
                name: data.name
            })
        }

        const res = await fetch(process.env.REACT_APP_PROD_API ? '/api/RegisterAccount' : 'http://localhost:7071/api/RegisterAccount', options)
        const json = await res.json()

        if(res.status === 200) {
            // Redirect to the ID given
            onNewLink(json.id)
        }
    };

    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <p> Palace Name </p>
          <input {...register("name")} />
          <p> Password (for editing) </p>
          <input {...register("password")} />
          <br />
          <Button type="submit"> Create Palace </Button>
        </form>
    )
}

export default CreateLinkForm