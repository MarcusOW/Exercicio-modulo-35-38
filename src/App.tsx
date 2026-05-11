import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Cart from './components/Cart'
import Footer from './components/Footer'
import Rotas from './routes'
import { store } from './store'
import { GlobalCss } from './styles'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalCss />
        <Rotas />
        <Footer />
        <Cart />
      </BrowserRouter>
    </Provider>
  )
}

export default App
