const axios = require("axios");

async function getFlightPrices(origin, destination, date) {
  try {
    let quotes;
    let data = JSON.stringify({
      query: {
        market: "IN",
        locale: "en-GB",
        currency: "INR",
        query_legs: [
          {
            origin_place_id: {
              iata: "DLI",
            },
            destination_place_id: {
              iata: "JAI",
            },
            date: {
              year: 2023,
              month: 5,
              day: 15,
            },
          },
        ],
        adults: 1,
        cabin_class: "CABIN_CLASS_ECONOMY",
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "prtl6749387986743898559646983194",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        quotes = response.data.content.results.itineraries;
        const agent = response.data.content.results.agents;
        console.log(
          Object.values(quotes)[0].pricingOptions[0].price.amount.slice(4),
          agent[Object.values(quotes)[0].pricingOptions[0].agentIds[0]].name
        );
        console.log(
          Object.values(quotes)[6].pricingOptions[0].price.amount.slice(4),
          agent[Object.values(quotes)[6].pricingOptions[0].agentIds[0]].name
        );
        console.log(
          Object.values(quotes)[5].pricingOptions[0].price.amount.slice(4),
          agent[Object.values(quotes)[5].pricingOptions[0].agentIds[0]].name
        );
        console.log(
          Object.values(quotes)[3].pricingOptions[0].price.amount.slice(4),
          agent[Object.values(quotes)[3].pricingOptions[0].agentIds[0]].name
        );
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err);
  }
}

getFlightPrices();
