import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../../store/reducers/cart'

import Header from '../../components/Header'
import ItemList from '../../components/ItemList'
import ItemDetails from '../../components/ItemDetails'
import Cart from '../../components/Cart'
import RestaurantModel, {
  MenuItem,
  ApiRestaurant
} from '../../models/RestaurantModel'

const RestaurantItems = () => {
  const { id } = useParams<{ id: string }>()
  const [restaurant, setRestaurant] = useState<RestaurantModel | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data: ApiRestaurant[]) => {
        const found = data.find((item) => item.id === Number(id))
        if (found) {
          setRestaurant(new RestaurantModel(found))
        }
      })
  }, [id])

  const handleAddToCart = (item: MenuItem) => {
    dispatch(add(item))
    setSelectedItem(null)
  }

  const openModal = (item: MenuItem) => {
    setSelectedItem(item)
  }

  if (!restaurant) {
    return <h4>Carregando...</h4>
  }

  return (
    <>
      <Header variante="items" mostrarCarrinho={true} restaurant={restaurant} />
      <ItemList items={restaurant.menu} onItemClick={openModal} />
      <ItemDetails
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}

export default RestaurantItems
