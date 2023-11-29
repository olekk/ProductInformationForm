import { FC } from "react"
import { Button, FormGroup, FormLabel, ListGroup } from "react-bootstrap"
import { UseFormSetValue } from "react-hook-form"
import { Inputs } from "components/types"
import Bullet from "./Bullet"

interface IProps {
    bullets?: string[],
    setValue: UseFormSetValue<Inputs>
}

const ProductBullets: FC<IProps> = ({ bullets, setValue }) => {

    const onDelete = (id: number) => {
        const updatedBullets = bullets
        updatedBullets?.splice(id, 1)
        setValue('bullets', updatedBullets)
    }
    const onAdd = (val: string) => {
        setValue('bullets', [...(bullets || []), val])
    }

    return (
        <FormGroup className="mb-3" controlId="formProductBullets">
            <FormLabel>Product Features</FormLabel>
            <ListGroup>
                {bullets?.map((bullet, index) => (
                    <Bullet
                        key={index}
                        id={index}
                        text={bullet}
                        onDelete={onDelete}
                        setValue={setValue}
                    />
                ))}

                <Bullet
                    key={-1}
                    id={-1}
                    onAdd={onAdd}
                />
            </ListGroup>

        </FormGroup>
    )
}

export default ProductBullets