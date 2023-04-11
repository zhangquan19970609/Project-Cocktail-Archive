// 全部从 context 中 取值过于 jamming，
// 因此在本页面中重新设置 loading 和 fetch API

import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  
  // console.log(useParams()); // 实验后发现，传入的是 对应的 id。
  const {id} = useParams();

  const [loading, setLoading] = React.useState(true);
  const [cocktail, setCocktail] = React.useState(null);

  useEffect(() => { // 每次刷新时要执行的操作：
    setLoading(true);
    
    const fetchOne = async () => {
      try {
        // 要显示的本页 data
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        console.log(data);
        // 先 check drinks 是否存在，
        // 再将 API 传输的 drinks 变成能用的 object
        if (data.drinks) {
            const {
              idDrink: id, 
              strDrink: name, 
              strDrinkThumb: image, 
              strAlcoholic: info, 
              strGlass: glass,
              strInstructions: instruction,
              strCategory: category,
              strIngredient1, 
              strIngredient2, 
              strIngredient3, 
              strIngredient4, 
              strIngredient5
            } = data.drinks[0];
          
            // 设置一个 ingredient array:
            const ingredients = [
              strIngredient1, 
              strIngredient2, 
              strIngredient3, 
              strIngredient4, 
              strIngredient5
            ]
            // 然后再设置一个 newCocktail
            const newCocktail = {name, image, info, glass, instruction, category, ingredients};
            setCocktail(newCocktail);
        } else {
          setCocktail(null); // 若不存在则 setBack to null
        } 
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchOne();    
  },[id]) // 每次 id 发生变化，则重新 fetch 本页的 data。

  // check 是否 loading，若 loading 则显示 loading
  if (loading) {
    return <Loading />
  }
  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>
  }
  const {name, image, info, glass, instruction, category, ingredients} = cocktail;
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>back home</Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name}></img>
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name:</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category:</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info:</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass:</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instruction:</span>
            {instruction}
          </p>
          <p>
            <span className='drink-data'>ingredient:</span>
            {/* 用 map 方式将 ingrendients 列出，并考虑有些 cocktail 的 ingredients 不满五种。 */}
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item},</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
