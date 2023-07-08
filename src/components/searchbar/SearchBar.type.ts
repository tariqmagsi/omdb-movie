import { ChangeEventHandler, FormEventHandler } from "react"

export type SearchBarProps = {
    search: string,
    movieType: string,
    year: string,
    handleSubmit: FormEventHandler<HTMLFormElement>,
    handleInputChange: ChangeEventHandler<HTMLInputElement>,
    handleSelectChange: ChangeEventHandler<HTMLSelectElement>
}