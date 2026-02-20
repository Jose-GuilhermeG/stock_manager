import {
    Route,
    BrowserRouter,
    Routes
}
from 'react-router-dom' 

//pages
import BasePage from './pages/Base'
import NotFoundPage from './pages/NotFoundPage'

//tabs
import HomePage from './pages/Home'

export default function AppicationRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<BasePage/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path='*' element={<NotFoundPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}