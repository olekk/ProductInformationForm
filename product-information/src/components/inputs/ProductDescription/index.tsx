import { FC, useEffect } from "react"
import { Inputs } from "components/types"
import { FormGroup, FormLabel, FormText } from "react-bootstrap"
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface IProps {
    error?: FieldError,
    register: UseFormRegister<Inputs>,
    setValue: UseFormSetValue<Inputs>
}

const ProductDescription: FC<IProps> = ({ error, register, setValue }) => {
    useEffect(() => {
        register("description");
    }, [register]);

    const onEditorStateChange = (editorState: string) => {
        setValue("description", editorState);
    }
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
        ],
    }

    const formats = [
        'bold', 'italic', 'underline',
    ]

    return (
        <FormGroup className="mb-3" controlId="formProductDescription">
            <FormLabel>Product Description</FormLabel>

            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={onEditorStateChange}
                className="rounded-3 overflow-hidden border"
                defaultValue=""
                placeholder="Enter Product Description"
            />
            <FormText className="text-danger">{error?.message}</FormText>
        </FormGroup>
    )
}

export default ProductDescription