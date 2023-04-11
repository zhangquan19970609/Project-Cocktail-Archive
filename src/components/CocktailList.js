import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {cocktails, loading} = useGlobalContext();

  if (loading === true) { // 处于 Loading true 情况时，加载 Loading 动画。
    return <Loading />
  }
  if (cocktails.length < 1) { // cocktails 并非整个列表，而是 query 到用以展示的。
    return <h2 className='section-title'>no cocktails matched your search criteria</h2>
  }

  return (
    <section className='section'>
      <h2 className='section-title'>cocktails</h2>
      <div className='cocktails-center'>
        {cocktails.map((item, index) => {
          {/* const {id, name, image, info, glass} = item; */}
          return (
            <Cocktail 
              key={index} {...item}
              // 使用 {...item} 来输入所有的 item properties.
              // id={id}
              // name={name}
              // image={image}
              // info={info}
              // glass={glass}
            />
          )
        })}
      </div>
    </section>
  )
}

export default CocktailList
