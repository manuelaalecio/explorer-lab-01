import './css/index.css'
import IMask from 'imask'

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('#flag-cc-img')

function setCardType(type) {
  const colors = {
    'visa': ['#315881', '#DFA43B'],
    'mastercard': ['#F79E1B', '#FF3737'],
    'american-express': ['#98A99F', '#0E1B14'],
    'elo': ['#FFF20080', '#00A4E080'],
    'default': ['black', 'grey'],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1]) 
  ccLogo.setAttribute("src", `/cc-${type}.svg`)
}

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: '0000'
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    }
  }
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2}\d{0,12})/,
      cardtype: 'mastercard',
    },
    {
      mask: '0000 000000 00000',
      regex: /(^34\d{0,15}|^37\d{0,15})/,
      cardtype: 'american-express',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^6\d{0,15}/,
      cardtype: 'elo',
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector('#add-card')
addButton.addEventListener('click', () => {alert('CARTÃO ADICIONADO')})

document.querySelector('form').addEventListener('submit', (event) => {event.preventDefault()})

const cardHolder = document.querySelector('#card-holder')
cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value')

  ccHolder.innerHTML = cardHolder.value.length === 0 ? 'FULANO DA SILVA' : cardHolder.value
})