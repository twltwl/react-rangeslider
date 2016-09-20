import React from 'react'
import { Header, Footer } from './shared'
import { Horizontal, Negative, Float, Vertical } from './sliders'
import './app.less'

function App () {
  return (
    <div className='wrapper'>
      <Header />
      <section id='examples'>
        <Horizontal />
        <Negative />
        <Float />
        <Vertical />
      </section>
      <Footer />
    </div>
  )
}

export default App
