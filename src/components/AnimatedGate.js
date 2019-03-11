import React, { Component } from 'react';
import changeCase from 'change-case';
import Head from './head';
import Header from './Header';

class AnimatedGate extends Component {
  header = () => {
    const { query } = this.props;

    if(!query || !query.tema) return <Head />

    const tema = changeCase.titleCase(query.tema);
    
    return (
      <Head
        title={ `Curso de ${ tema } – Aprenda sobre tudo, personalizado para você | Yurah` }
        url={ `https://yurah.com.br/assinar/${ changeCase.paramCase(tema) }` }
        description={ `Yurah é um assistente inteligente de educação que irá te ensinar sobre ${ tema }. Dê o primeiro passo para aprender o que quiser.` }
      />
    )
  }

  render = () =>
    <section id='Gateway' className='home-background full-page'>
      {
        this.header()
      }
      
      <Header loaded={ this.props.bootstraped } />
      
      {
        (this.props.bootstraped) &&
        this.props.children
      }
    </section>  
}

export default AnimatedGate;