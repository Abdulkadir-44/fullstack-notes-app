import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {AppRouter} from './routes/AppRouter'

const App = () => {
  return (
    <Router>
      <AppRouter/>
    </Router>
  )
}

export default App

// mantıken program ilk ayağa kalktığında bizim reduxımızın içindeki fonksiyon ilk önce localstorageyi kontrol edecek dolu ise ilgili değeri alcak yoksa false olcak ve biz routing yönlendirmelerimizde bu değere bakacağız eğer kullanıcı yoksa login sayfasına gidecek eğer kullanıcı varsa dashboard sayfasına gidecek veya home sayfası