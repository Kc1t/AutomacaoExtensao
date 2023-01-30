"use strict"

function init(){

    const price = document.querySelector(
        'div.ui-pdp-price__second-line > span > span.andes-money-amount__fraction'
        )
        ?.innerText.replace('.','') || '0' // pega a div em comum dos diferentes anuncios

    const cents = document.querySelector('div.ui-pdp-price__second-line > span > span.andes-money-amount__fraction > andes-money-amount__cents')?.innerText || '0'

    const sold = Number (document.querySelector('.ui-pdp-header__subtitle').innerText.split(' ')[4])

    const container = document.querySelector(".ui-pdp-header__title-container");
    
    container.insertAdjacentElement(
    "beforebegin",
    `
        <ul class="mltext-container">
            <li> Receita Bruta: <span>R$ 500</span></li>
        </ul>
    `
    )
}

init()




// cont.insertAdjacentHTML('beforebegin', '<h1>OIIIII</h1>') insertAdjacentHtml adiciona conteudo html onde inserido
