import { FC, useEffect, useState } from 'react'
import { FormGroup, FormLabel, ListGroup } from 'react-bootstrap'
import { UseFormSetValue } from 'react-hook-form'
import { Inputs } from 'components/types'
import Bullet from './Bullet'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface IProps {
    bullets: ({ id: number; text: string; })[]
    setValue: UseFormSetValue<Inputs>
}

const ProductBullets: FC<IProps> = ({ bullets, setValue }) => {
    const [localBullets, setLocalBullets] = useState<({ id: number; text: string; })[]>(bullets)

    useEffect(() => {
        setLocalBullets(bullets)
    }, [bullets])

    const onDelete = (id: number) => {
        const updatedBullets = localBullets
        updatedBullets.splice(id, 1)
        setValue('bullets', updatedBullets)
    }

    const onAdd = (val: string) => {
        setValue('bullets', [...localBullets, { text: val, id: localBullets.length }])
    }

    const onMove = (dragIndex: number, hoverIndex: number) => {
        setLocalBullets(prev => {
            let updatedBullets = [...prev]
            let temp = updatedBullets[dragIndex]
            updatedBullets[dragIndex] = updatedBullets[hoverIndex]
            updatedBullets[hoverIndex] = temp
            return updatedBullets
        })
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <FormGroup className="mb-3" controlId="formProductBullets">
                <FormLabel>Product Features</FormLabel>
                <ListGroup>
                    {localBullets && localBullets.map((bullet, index) => (
                        <Bullet
                            key={index}
                            id={bullet.id}
                            index={index}
                            text={bullet?.text}
                            onDelete={onDelete}
                            setValue={setValue}
                            onMove={onMove}
                        />
                    ))}

                    <Bullet key={-1} id={-1} index={-1} onAdd={onAdd} />
                </ListGroup>
            </FormGroup>
        </DndProvider>
    )
}

export default ProductBullets