"use strict";

async function init() {
  //Base, espera 1,5s por causa do reload do primeiro segundo do mercado livre e exibe as infos

  const price =
    document
      .querySelector(
        "div.ui-pdp-price__second-line > span > span.andes-money-amount__fraction"
      )
      ?.innerText.replace(".", "") || "0"; // pega a div em comum dos diferentes anuncios

  const cents =
    document.querySelector(
      "div.ui-pdp-price__second-line > span > span.andes-money-amount__fraction > andes-money-amount__cents"
    )?.innerText || "0";

  const sold = Number(
    document.querySelector(".ui-pdp-header__subtitle")?.innerText.split(" ")[4]
  );

  const container = document.querySelector(".ui-pdp-header__title-container");

  const total = Number(price + "." + cents) * sold;

  setTimeout(() => {
    container.insertAdjacentHTML(
      "beforebegin",
      `
            <ul class="mltext-container">
            <li> Receita Bruta: <span>${formatMoney(total)}</span></li>
            <li> Receita Liquida: <span>${formatMoney(receipt)}</span></li>
            <li> Receita por Unidade: <span>${formatMoney(
              unitReceipt
            )}</span></li>
            <li> Receita média diária: <span>${formatMoney(
              daySellAvg
            )}</span></li>
            <li> Comissão do Mercado Livre: <span>${formatMoney(
              sale_fee_amount
            )}</span></li>
            <li> Anuncio Criado em: <span>${formatDate(
              startTime
            )} - ${diffDays} dias atrás</span></li>
            </ul>
            `
    );
  }, 1500);

  //Pegando Infos atraves da api do ml

  const adId = document
    .querySelector('meta[name="twitter:app:url:iphone"]')
    ?.content.split("id=")[1]; //separa a pt esquerda do content pra pegar o id do produto

  const mlResponse = await handleMLapi(
    `https://api.mercadolibre.com/items?ids=${adId}`
  );

  const {
    body: { category_id, listing_type_id, start_time },
  } = mlResponse[0] || null; //pegando informações importantes da array do produto

  //sale_fee_amount é referente a comissão que o ml pega do produto especifico
  const { sale_fee_amount } =
    (await handleMLapi(
      `https://api.mercadolibre.com/sites/MLB/listing_prices?price=${price}&listing_type_id=${listing_type_id}&category_id=${category_id}`
    )) || {};

  //Receita Liquida e Por Unidade
  const unitReceipt = price - sale_fee_amount;
  const receipt = unitReceipt * sold;

  //Receita média diaria e data de criação do anuncio
  const startTime = new Date(start_time);
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hor, min, seg, miliseg
  const diffDays = Math.round(Math.abs(startTime - today) / oneDay);
  const daySellAvg = receipt / diffDays;
}

// formatando para visualizar em BRL
function formatMoney(value) {
  return value.toLocaleString("pt-BR", {
    //converte o numero do total para string
    style: "currency",
    currency: "BRL",
  });
}

//insere o 0 caso o dia tenha menos que 2 caracteres e formata a data
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0"),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

//requisição na api
async function handleMLapi(url) {
  try {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, config);
    const finalRes = await response.json();
    return finalRes;
  } catch (err) {
    console.log("erro na requisição: ", err);
  }
}

init();
