import {
    Route,
    BrowserRouter,
    Routes
}
from 'react-router-dom' 
import { AuthenticateVerify  } from './components/ProtectedRoute/AuthenticateVerify'

//pages
import BasePage from './pages/Base'
import LoginPage from './pages/LoginPage'

//tabs
import HomePage from './pages/Home'
import StockPage from './pages/stock'
import NotFoundPage from './pages/NotFoundPage'
import EnterprisesPage from './pages/EnterprisesPage'


export default function AppicationRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/account/login/' element={<LoginPage/>} />
                    <Route path='/' element={<BasePage/>}>
                        <Route index element={
                            <AuthenticateVerify>
                                <HomePage/>
                            </AuthenticateVerify>
                        }/>
                        <Route path='/stock' element={<StockPage/>}/>
                        <Route path='/enterprises' element={<EnterprisesPage/>} />
                        <Route path='*' element={<NotFoundPage/>} />
                    </Route>
            </Routes>
        </BrowserRouter>
    )
}