export interface Car {
  id: string
  name: string
  category: 'Financed' | 'Company' | 'Rented'
  primaryUse: string
  engineType: string
  price: string
  addedOn: string
  imageUrl: string
}
