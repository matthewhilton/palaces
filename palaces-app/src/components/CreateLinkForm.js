import { useForm } from "react-hook-form";

const CreateLinkForm = ({onNewLink}) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async data => {
        // Setup request
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: data.password,
                name: data.name
            })
        }

        const res = await fetch(process.env.REACT_APP_PROD_API ? 'https://palaces-app-apim.azure-api.net/palaces-app/RegisterAccount' : 'http://localhost:7071/api/RegisterAccount', options)
        const json = await res.json()

        if(res.status === 200) {
            // Redirect to the ID given
            onNewLink(json.id)
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <p> account name </p>
          <input {...register("name")} />
          <p> coverimage </p>
          <input {...register("coverImage")} />
          <p> password </p>
          <input {...register("password")} />
          <input type="submit" />
        </form>
    )
}

export default CreateLinkForm