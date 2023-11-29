import { FC, useState } from 'react';
import { Inputs } from 'components/types';
import { ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { PlusSquare, XOctagon, Save, PencilSquare, Trash } from 'react-bootstrap-icons';
import { UseFormSetValue } from 'react-hook-form';

interface IProps {
    id: number,
    text?: string,
    onDelete?: (id: number) => void,
    onAdd?: (val: string) => void,
    setValue?: UseFormSetValue<Inputs>
}

const Bullet: FC<IProps> = ({ id, text, onDelete, onAdd, setValue }) => {

    const [isEdit, setIsEdit] = useState(false)
    const [newVal, setNewVal] = useState('')

    const onSave = () => {
        setValue?.(`bullets.${id}`, newVal)
    }

    // Empty Bullet to add new entries
    if (id === -1) {
        return (
            <ListGroupItem key={0} className="d-flex border-top">

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
        <ListGroupItem key={id} className="d-flex">
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
    )
}

export default Bullet