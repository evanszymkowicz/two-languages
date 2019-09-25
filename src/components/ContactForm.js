import React from 'react'
import { FormattedMessage } from 'react-intl'
import { navigateTo } from 'gatsby-link'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch(`/${this.props.lang}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigateTo(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    const isSpanish = this.props.lang === 'esp'
    return (
      <div className="content site-width">
        <div className="form-box">
          {this.props.data && (
            <div>
              <h2>{this.props.data.contactSectionTitle}</h2>
              <span
                dangerouslySetInnerHTML={{
                  __html: this.props.data.contactSectionText.childMarkdownRemark
                    .html,
                }}
              />
            </div>
          )}
          <form
            name="contact"
            method="post"
            action={`/${this.props.lang}/thanks/`}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />

            <p hidden>
              <label>
                You can ignore this field:{' '}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>

            <label htmlFor="name">
              <FormattedMessage id="name" />
            </label>
            <FormattedMessage id="namePlaceholder">
              {text => (
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={text}
                  onChange={this.handleChange}
                />
              )}
            </FormattedMessage>

            <label htmlFor="email">
              <FormattedMessage id="email" />
            </label>
            <FormattedMessage id="emailPlaceholder">
              {text => (
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder={text}
                  onChange={this.handleChange}
                />
              )}
            </FormattedMessage>

            <label htmlFor="message">
              <FormattedMessage id="message" />
            </label>
            <FormattedMessage id="messagePlaceholder">
              {text => (
                <textarea
                  name="message"
                  id="text"
                  placeholder={text}
                  onChange={this.handleChange}
                />
              )}
            </FormattedMessage>

            {isSpanish && (
              <label htmlFor="confirmation" className='small'>
                <FormattedMessage id="gdpr_law"/>
              </label>
            )}

            {isSpanish && (
              <label htmlFor="confirmation" className='small'>
                <FormattedMessage id="gdpr_subject"/>
              </label>
            )}

            {isSpanish && (
              <label htmlFor="confirmationCheckbox" className='small'>
                <FormattedMessage id="gdpr_confirmation"/>
              </label>)}

            {isSpanish && (<input
              type="checkbox"
              name="confirmationCheckbox"
              id="confirmationCheckbox"
              onChange={this.handleChange}
              required
            />)}


            {isSpanish && (<label htmlFor="confirmationCheckbox" className='small'>
              <FormattedMessage id="gdpr_more_info"/>
              <a href={require('../assets/terms_and_conditions.pdf')} target="_blank">TU</a>
            </label>)}

            <FormattedMessage id="send">
              {text => <input type="submit" value={text} />}
            </FormattedMessage>
          </form>
        </div>
      </div>
    )
  }
}
