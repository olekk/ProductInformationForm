import { Inputs } from "components/types"
import { FC } from "react"
import { FormGroup, FormLabel, FormControl, FormText } from "react-bootstrap"
import { FieldError, UseFormRegister } from "react-hook-form"

interface IProps {
    error?: FieldError,
    register: UseFormRegister<Inputs>
}

const ProductTitle: FC<IProps> = ({ error, register }) => {
    return (
        <FormGroup className="mb-3" controlId="formProductTitle">
            <FormLabel>Product Title</FormLabel>
            <FormControl type="text" placeholder="Enter Title" {...register('title', { required: true })} />
            <FormText className="text-danger">{error?.message}</FormText>
        </FormGroup>
    )
}

export default ProductTitle