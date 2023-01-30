'use strict';

function init(){

    const price = document.querySelector(
        'div.ui-pdp-price__second-line > span > span.andes-money-amount__fraction'
        )
        ?.innerText.replace('.','') || '0' // pega a div em comum dos diferentes anuncios

    const cents = document.querySelector('div.ui-pdp-price__second-line > span > span.andes-money-amount__fraction > andes-money-amount__cents')?.innerText || '0'

    const sold = Number (document.querySelector('.ui-pdp-header__subtitle')?.innerText.split(' ')[4])

    const container = document.querySelector(".ui-pdp-header__title-container");

    const total = Number(price + '.' + cents) * sold

    setTimeout(() => { // no ml a pg tem um refresh no primeiro segundo, ent apos 1,5 s isso vai funcionar
        container.insertAdjacentHTML(
            "beforebegin",
            `
            <ul class="mltext-container">
            <li> Receita Bruta: <span>${formatMoney(total)}</span></li>
            </ul>
            `
            )
        }, 1500)

    }

function formatMoney(value){
    return value.toLocaleString('pt-BR',{ //converte o numero do total para string
        style: 'currency',
        currency: 'BRL'
    })
}


init()




// cont.insertAdjacentHTML('beforebegin', '<h1>OIIIII</h1>') insertAdjacentHtml adiciona conteudo html onde inserido
