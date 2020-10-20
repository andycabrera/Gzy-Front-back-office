import MenuItem from '@material-ui/core/MenuItem'
import {
    Field,
    useFormikContext,
    FieldArray,
    FieldArrayRenderProps,
} from 'formik'
import React from 'react'
import { useQuery } from 'react-query'
import Grid from '@material-ui/core/Grid'
import Input from '../forms/Input'
import TagsInput from '../forms/TagsInput'
import MultipleSelect from '../forms/MutipleSelect'
import DatePickerInput from '../forms/DatePickerInput'
import TypeService from '~/services/types'
import CategoriesService from '~/services/categories'
import { Type } from '~/interfaces/type'

interface GetFetchResponse {
    count: number
    items: Type[]
}

function BasicInfo() {
    const {
        data: { items: typeOptions },
    } = useQuery<GetFetchResponse>([`allTypes`, 0, 100], TypeService.fetch, {
        initialData: { count: 0, items: [] },
        initialStale: true,
    })

    const {
        data: { items: categoryOptions },
    } = useQuery<GetFetchResponse>(
        [`allCategories`, 0, 100],
        CategoriesService.fetch,
        {
            initialData: { count: 0, items: [] },
            initialStale: true,
        }
    )

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Field
                    component={Input}
                    fullWidth
                    required
                    name="es.title"
                    label="Titulo en español"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Field
                    component={Input}
                    fullWidth
                    required
                    name="en.title"
                    label="Titulo en ingles"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Field
                    component={Input}
                    fullWidth
                    required
                    name="es.description"
                    label="Descripcion en español"
                    multiline
                    rows={5}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Field
                    component={Input}
                    fullWidth
                    required
                    name="en.description"
                    label="Descripcion en ingles"
                    multiline
                    rows={5}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <Field
                    component={Input}
                    fullWidth
                    required
                    name="author"
                    label="Autor"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <FieldArray
                    name="searchTags"
                    component={(arrayHelpers: FieldArrayRenderProps) => {
                        return (
                            <TagsInput
                                required
                                fullWidth
                                push={arrayHelpers.push}
                                remove={arrayHelpers.remove}
                                label="Tags de busqueda"
                                form={arrayHelpers.form}
                                name={arrayHelpers.name}
                            />
                        )
                    }}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <Field
                    component={Input}
                    fullWidth
                    required
                    name="type"
                    label="Tipo"
                    select
                >
                    {typeOptions.map(type => (
                        <MenuItem
                            key={`${type.es.name}_${type._id}`}
                            value={type._id}
                        >
                            {type.es.name}
                        </MenuItem>
                    ))}
                </Field>
            </Grid>

            <Grid item xs={12} md={12}>
                <Field
                    name="categories"
                    menuItemLabelKey="es.name"
                    menuItemIdKey="_id"
                    component={MultipleSelect}
                    data={categoryOptions}
                    fullWidth
                    required
                    label="Categorias"
                />
            </Grid>

            <Grid
                container
                item
                xs={12}
                md={12}
                spacing={2}
                style={{ paddingRight: '0px' }}
            >
                <Grid item xs={6} md={3}>
                    <Field
                        component={DatePickerInput}
                        required
                        name="availableSince"
                        label="Habilitado desde"
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <Field
                        component={DatePickerInput}
                        required
                        name="availableUntil"
                        label="Habilitado hasta"
                    />
                </Grid>

                <Grid item xs={12} md={6} style={{ paddingRight: '0px' }}>
                    <Field
                        name="availableFor"
                        component={MultipleSelect}
                        fullWidth
                        required
                        label="Habilitado para descargar"
                        menuItemLabelKey="name"
                        menuItemIdKey="_id"
                        data={[
                            {
                                _id: 'mesa',
                                name: 'Usuario mesa de dinero',
                            },
                            {
                                _id: 'otro',
                                name: 'Otro rol de usuario',
                            },
                        ]}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default BasicInfo
