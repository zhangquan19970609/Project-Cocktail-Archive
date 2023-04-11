// 使用 useRef 来构建 Uncontrolled input.
  // Uncontrolled input 与 useState 创建的 contolled input 不同，
  // Uncontrolled input 每次改变 value，不会引起页面的 re-render。

// 可参考 photo stock project 来观察 controlled input
import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  // 这是使用 useRef 使用 uncontrolled input 的方法：
  const searchValue = React.useRef('');

  React.useEffect(() => { // 等同于一个 useEffect 但不需要 import
    searchValue.current.focus(); 
    // 对准这个页面
  },[])

  // 由 onChange 引发
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value)
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          {/* 这是使用 controlled input 的方法： */}
          {/* <input type='text' name='name' id='name' onChange={(e) => setSearchTerm(e.target.value)}/> */}
          
          {/* 这是使用 useRef 进行 uncontrolled input 的方法 */}
          <input 
            type='text' 
            id='name' 
            ref={searchValue} // 用以代替 value 或 onChange 
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
