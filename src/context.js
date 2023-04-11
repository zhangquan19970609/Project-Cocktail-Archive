import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
// 此处使用的 API, 由于使用 name search，因此是 search.php?s= {name} 的格式，
// fetch 时也利用同样的格式：fetch(`${url}${searchTerm}`),url 后直接跟 name！
const AppContext = React.createContext()


const AppProvider = ({ children }) => {
  // 第四步：设置一些 state value, 与相应的 setter
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('a'); // 输入 search 框的内容
  const [cocktails, setCockTails] = useState([]); // 用于展示的 cocktail list, 并非整个列表
    // Chrome 提醒，应把 fetchDrinks 作为 useEffect 的 dependency list 加入。
    // 但加入后会导致无限循环：fetchDrinks 重设了 cocktails state，
    // 而重设 state 又会导致 刷新并再次执行 useEffect => fetchDrinks.
    // 因此设置一个 useCallback，仅当 [searchTerm] 产生变化时才重新创建 fetchDrinks
  const fetchDrinks = useCallback(async () => { // 使用 try - catch error 
    setLoading(true); // 若有 Loading state，每次 fetch 必须以 setLoading 开头。
    try {
      const response = await fetch(`${url}${searchTerm}`); // 输入 searchTerm，display list 随动的秘诀
      const data = await response.json();
      // console.log(data); // 返回一个 25 长度的 array。

      const {drinks} = data; //  将 data 中的 drinks array 取出
      if(drinks){ // 当 data 中的 drinks 不为空时，则处理 API 发送来的 object，
        // 将其处理成一个方便调用的 array 并 set 到 cocktails.
        const newCocktails = drinks.map((item) => {
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item;
          return {
            id:idDrink, 
            name: strDrink, 
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          }
        })
        setCockTails(newCocktails);
      } else { // 当 data 中的 drinks 为空时，则将 cockTails 还原至 []，Cocklist 显示 no fetching data 的信息
        setCockTails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },[searchTerm])// 因此设置一个 useCallback，仅当 [searchTerm] 产生变化时才重新创建 fetchDrinks

  useEffect(() => {
    fetchDrinks();
    console.log()
  }, [searchTerm, fetchDrinks]) 
  // dependency list 填 searchTerm 而非 cocktails, 每次输入时重新刷新
  // 一开始得出的 25 长度的 array，即是 searchItem 作为 a 时的 array

  return <AppContext.Provider 
    value={{
      loading, setLoading,
      searchTerm, setSearchTerm,
      cocktails, setCockTails
    }}>
    {children}
  </AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
