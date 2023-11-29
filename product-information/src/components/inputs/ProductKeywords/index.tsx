import { FC, useEffect, useState } from 'react'
import { FormGroup, FormLabel } from 'react-bootstrap'
import { UseFormSetValue } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { MultiValue } from 'react-select'
import { Inputs } from 'components/types'

interface OptionType {
    value: string
    label: string
}

interface IProps {
    setValue: UseFormSetValue<Inputs>
}

const ProductKeywords: FC<IProps> = ({ setValue }) => {
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([])

    const handleChange = (newValue: MultiValue<OptionType>, actionMeta: any) => {
        setSelectedOptions(newValue)
        console.log(newValue)
    }

    const handleCreateOption = (inputValue: string) => {
        const newOption: OptionType = { value: inputValue, label: inputValue }
        setSelectedOptions([...(selectedOptions), newOption])
    }
    useEffect(() => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setValue('keywords', selectedValues);
    }, [selectedOptions, setValue]);

    return (

        <FormGroup className="mb-3" controlId="formProductKeywords">

            <FormLabel>Product Keywords</FormLabel>
            <CreatableSelect
                isMulti
                onChange={handleChange}
                onCreateOption={handleCreateOption}
                value={selectedOptions}
            />
        </FormGroup>
    )
}

export default ProductKeywords;