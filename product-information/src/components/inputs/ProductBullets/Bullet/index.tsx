import { FC, useState } from 'react'
import { DragItem, Inputs, ItemTypes } from 'components/types'
import { ListGroupItem, FormControl, Button } from 'react-bootstrap'
import { PlusSquare, XOctagon, Save, PencilSquare, Trash } from 'react-bootstrap-icons'
import { UseFormSetValue } from 'react-hook-form'
import { useDrag, useDrop } from 'react-dnd'

interface IProps {
    id: number,
    index: number,
    text?: string,
    onDelete?: (id: number) => void,
    onAdd?: (val: string) => void,
    setValue?: UseFormSetValue<Inputs>
    onMove?: (dragIndex: number, hoverIndex: number) => void
}

const Bullet: FC<IProps> = ({ id, text, index, onDelete, onAdd, setValue, onMove }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [newVal, setNewVal] = useState('')

    const onSave = () => {
        setValue?.(`bullets.${index}`, { text: newVal, id: id })
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BULLET,
        item: { id: index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BULLET,
            drop: (item: DragItem) => { onMove?.(index, item.id) },
        }),
        [index]
    )

    if (id === -1) {
        return (
            <ListGroupItem className="d-flex border-top">

                <FormControl
                    type="text"
                    placeholder="Enter Feature"
                    className="p-1"
                    value={newVal}
                    onChange={val => setNewVal(val.target.value)}
                />

                <Button variant="outline-success" className="p-1 mx-1" onClick={() => { onAdd?.(newVal); setNewVal("") }}>
                    <PlusSquare size={20} />
                </Button>

                <Button variant="outline-warning" className="p-1" onClick={() => setNewVal("")}>
                    <XOctagon size={20} />
                </Button>

            </ListGroupItem >
        )
    }
    // Existing Bullet in a state edition or static 
    return (
        <div ref={drop}>
            <ListGroupItem
                className={"d-flex" + (isDragging ? " opacity-50" : '')}
                ref={drag}
                style={{ cursor: 'move' }}
            >
                {isEdit ? (<>
                    <FormControl
                        type="text"
                        placeholder="Enter Feature"
                        className="p-1"
                        defaultValue={text}
                        onChange={val => setNewVal(val.target.value)}
                    />

                    <Button variant="outline-success" className="p-1 mx-1" onClick={() => { onSave(); setIsEdit(v => !v) }}>
                        <Save size={20} />
                    </Button>

                    <Button variant="outline-warning" className="p-1" onClick={() => setIsEdit(v => !v)}>
                        <XOctagon size={20} />
                    </Button>

                </>) : (<>
                    <div className="flex-grow-1">{text}</div>

                    <Button variant="outline-primary" className="p-1 mx-1" onClick={() => { setIsEdit(v => !v) }}>
                        <PencilSquare size={20} />
                    </Button>

                    <Button variant="outline-danger" className="p-1" onClick={() => onDelete?.(id)}>
                        <Trash size={20} />
                    </Button>
                </>)}

            </ListGroupItem >
        </div>
    )
}

export default Bullet