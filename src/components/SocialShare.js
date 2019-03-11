import React, { Component } from 'react';
import { FacebookProvider, Share } from 'react-facebook';

class SocialShare extends Component {
  state = {
    url: `${ window.location.protocol }//${ window.location.host }/assinar/${ this.props.tema }`
  }

  render = () =>
    <div className='share-buttons'>
      <h3>{ this.props.text || 'Compartilhe agora' }</h3>

      <div className='social-buttons'>

        <FacebookProvider appId="708710672825447">
          <Share href={ this.state.url }>
            {({ handleClick, loading }) => (
              // eslint-disable-next-line
              <a href='#' disabled={ (loading) ? true : false } onClick={ handleClick } className='btn-social btn-facebook'>
                <i className='fab fa-facebook-f' />
              </a>
            )}
          </Share>
        </FacebookProvider>

        <a href={ `https://twitter.com/intent/tweet?text=O @timeyurah está me ajudando a aprender sobre ${ this.props.tema }. Estou estudando agora de forma rápida e simples. Quer aprender também? ${ this.state.url}` } className='btn-social btn-twitter'>
          <i className='fab fa-twitter' />
        </a>

        <a rel="noopener noreferrer" href={ `https://www.linkedin.com/sharing/share-offsite/?url=${ this.state.url }` } target='_blank' type='button' className='btn-social btn-linkedin'>
          <i className='fab fa-linkedin-in' />
        </a>

      </div>
    </div>
}

export default SocialShare;