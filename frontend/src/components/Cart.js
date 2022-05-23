import React from 'react'

function Cart({items}) {
  return (
    items.map(item => {
        return <h1 key={item.slug}>{item.name}</h1>
    })
  )
}

export default Cart