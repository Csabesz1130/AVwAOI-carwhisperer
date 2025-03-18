import { useEffect } from 'react'

interface FormPersistenceOptions {
  key: string
  form: any
  exclude?: string[]
}

export const useFormPersistence = ({ key, form, exclude = [] }: FormPersistenceOptions) => {
  useEffect(() => {
    const savedValues = localStorage.getItem(key)
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues)
      const filteredValues = Object.keys(parsedValues)
        .filter(key => !exclude.includes(key))
        .reduce((obj, key) => {
          obj[key] = parsedValues[key]
          return obj
        }, {})
      form.setFieldsValue(filteredValues)
    }

    const handleBeforeUnload = () => {
      const currentValues = form.getFieldsValue()
      const filteredValues = Object.keys(currentValues)
        .filter(key => !exclude.includes(key))
        .reduce((obj, key) => {
          obj[key] = currentValues[key]
          return obj
        }, {})
      localStorage.setItem(key, JSON.stringify(filteredValues))
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      localStorage.removeItem(key)
    }
  }, [key, form, exclude])

  const clearPersistedForm = () => {
    localStorage.removeItem(key)
  }

  return {
    clearPersistedForm
  }
}
