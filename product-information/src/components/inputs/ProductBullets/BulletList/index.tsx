import { FC } from "react"
import { Inputs } from "components/types"
import { ListGroup } from "react-bootstrap"
import { UseFormSetValue } from "react-hook-form"
import Bullet from "./Bullet"

interface IProps {
    bullets?: Record<string, { text: string } | undefined>,
    setValue: UseFormSetValue<Inputs>
}

const BulletList: FC<IProps> = ({ setValue, bullets }) => {

    const onDelete = (key: string) => {
        const updatedBullets = { ...bullets }
        delete updatedBullets[key]
        setValue('bullets', updatedBullets)
    }

    return (
        <ListGroup>
            {Object.entries(bullets || {}).map(bullet => (
                <Bullet
                    key={bullet[0]}
                    id={bullet[0]}
                    text={bullet[1]?.text}
                    onDelete={onDelete}
                    setValue={setValue}
                />
            ))}

            <Bullet
                key={0}
                id=""
                setValue={setValue}
            />
        </ListGroup>
    )
}

export default BulletList