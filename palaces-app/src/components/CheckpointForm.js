import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import accountAtomData from '../data/accountDataAtom';

const CheckpointForm = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useRecoilState(accountAtomData)

    const onSubmit = async formData => {
        if(formData.checkpoint == '') {
            // Clear the checkpoint
            const newData = {
                ...data,
                checkpoint: null
            }
            setData(newData)
            alert("Checkpoint cleared")
        } else {
            const newData = {
                ...data,
                checkpoint: Number.parseInt(formData.checkpoint)
            }
            setData(newData)
            alert(`Checkpoint set for card #${formData.checkpoint}`)
        }
    };

    return (
        <Container>
            <Container className='border p-3 rounded mb-3'>
                {data.checkpoint ? <p> Current checkpoint set after card {data.checkpoint} </p> : <p> No checkpoint set </p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p> Set new checkpoint after card # </p>
                    <input {...register("checkpoint")} />
                    <br />
                    <Button type="submit"> Set Checkpoint </Button>
                </form>
            </Container>
        </Container>
    )
}

export default CheckpointForm;