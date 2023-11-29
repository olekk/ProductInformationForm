import { FC, useState } from 'react';
import { Inputs } from 'components/types';
import { ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { PlusSquare, XOctagon, Save, PencilSquare, Trash } from 'react-bootstrap-icons';
import { UseFormSetValue } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

interface IProps {
    id: string,
    text?: string,
    onDelete?: (key: string) => void,
    setValue: UseFormSetValue<Inputs>
}

const Bullet: FC<IProps> = ({ id, text, onDelete, setValue }) => {

    const [isEdit, setIsEdit] = useState(false)
    const [newVal, setNewVal] = useState('')
    const currentId: string = id ? id : uuid()

    const onSave = () => {
        setValue(`bullets.${currentId}.text`, newVal)
    }

    // Empty Bullet to add new entries
    if (!id) {
        return (
            <ListGroupItem key={0} className="d-flex">

                <FormControl
                    type="text"
                    placeholder="Enter Feature"
                    className="p-1"
                    value={newVal}
                    onChange={val => setNewVal(val.target.value)}
                />

                <Button variant="outline-success" className="p-1 mx-1" onClick={() => { onSave(); setNewVal("") }}>
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
        <ListGroupItem key={currentId} className="d-flex">
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

                <Button variant="outline-danger" className="p-1" onClick={() => onDelete?.(currentId)}>
                    <Trash size={20} />
                </Button>
            </>)}

        </ListGroupItem >
    )
}

export default Bullet