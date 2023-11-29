import { Button, Form, Spinner } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Inputs } from "components/types"
import { formSchema } from "components/constants"

import ProductTitle from "components/inputs/ProductTitle"
import ProductDescription from "components/inputs/ProductDescription"
import ProductBullets from "components/inputs/ProductBullets"
import ProductKeywords from "components/inputs/ProductKeywords"

export const ProductForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const wbullets = watch('bullets') ?? []

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="w-100 m-2 p-3 p-sm-5 bg-white rounded-5 shadow-lg"
            style={{ maxWidth: 720 }}
        >
            <ProductTitle error={errors.title} register={register} />

            <ProductDescription error={errors.description} register={register} setValue={setValue} />

            <ProductBullets setValue={setValue} bullets={wbullets} />

            <ProductKeywords setValue={setValue} />

            <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
                Submit
                {isSubmitting && <>&nbsp; <Spinner animation="border" role="status" size="sm" /></>}
            </Button>
        </Form>
    )
}