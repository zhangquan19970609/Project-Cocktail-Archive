import React from 'react'
import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
    // 第三步：将 search form 和 cocltail list 放入 homepage。
    <main>
      <SearchForm />
      <CocktailList />
    </main>
  )
}

export default Home
