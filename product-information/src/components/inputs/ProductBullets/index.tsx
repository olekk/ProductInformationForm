import { FC } from "react"
import { FormGroup, FormLabel } from "react-bootstrap"
import { UseFormSetValue } from "react-hook-form"
import BulletList from "./BulletList"
import { Inputs } from "components/types"

interface IProps {
    bullets?: Record<string, { text: string } | undefined>,
    setValue: UseFormSetValue<Inputs>
}

const ProductBullets: FC<IProps> = ({ bullets, setValue }) => {
    return (
        <FormGroup className="mb-3" controlId="formProductBullets">
            <FormLabel>Product Features</FormLabel>
            <BulletList setValue={setValue} bullets={bullets} />
        </FormGroup>
    )
}

export default ProductBullets