import { DataTable } from "simple-datatables";

export function initializeTable(
  tableRef,
  setDataTable,
  setTableInitialized,
  DataTable,
  tableInitialized
) {
  if (!tableInitialized) {
    const dataTableSearch = new DataTable(tableRef.current!, {
      searchable: true,
      fixedHeight: false,
      columns: [
        {
          select: 0,
          render: function (asset) {
            return `<span class="font-bold text-white my-2 text-xs 2xl:text-sm"> ${asset[0].data}</span>`;
          }
        },
        {
          select: 1,
          render: function (symbol) {
            return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${symbol[0].data}</span>`;
          }
        },
        {
          select: 2,
          render: function (amount) {
            return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${amount[0].data}</span>`;
          }
        },
        {
          select: 3,
          render: function (value) {
            return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${value[0].data}</span>`;
          }
        },
        {
          select: 4,
          render: function (storage) {
            return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${storage[0].data}</span>`;
          }
        },
        {
          select: 5,
          render: function (riskLevel) {
            let color: string;
            switch (riskLevel[0].data) {
              case "1 - Historically Safe":
                color = "#7B62FF";
                break;
              case "2 - Low Risk":
                color = "#62FF97";
                break;
              case "3 - Medium Risk":
                color = "#FFF962";
                break;
              case "4 - High Risk":
                color = "#FF6262";
                break;
              default:
                color = "white";
            }
            return `<span style="color:${
              color || "white"
            }" class=" my-2 text-xs 2xl:text-sm"> ${riskLevel[0].data}</span>`;
          }
        },
        {
          select: 6,
          render: function (riskReview) {
            return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${riskReview[0].data}</span>`;
          }
        },
        // TODO: When we have recommendations, customize this
        // {
        //   select: 7,
        //   render: function (riskRecommendations) {
        //     const recommendations = riskRecommendations[0].data.split(",");

        //     let output = `<div>`;
        //     recommendations.forEach(
        //       (recommendation: string) =>
        //         (output += `<p class=" text-white my-2 text-xs 2xl:text-sm"> ${recommendation}</p>`)
        //     );
        //     output += `</div>`;

        //     return output;
        //   }
        // },
        {
          select: 7,
          render: function (assetId) {
            return `<button class="bg-[#4b5563] text-white shadow-sm text-sm py-1 px-3 rounded-full" data-assetId=${assetId[0].data}>Buy/Sell</button>`;
          }
        }
      ]
    });
    setDataTable(dataTableSearch);
    setTableInitialized(true);
  }
}

export function populateTable(
  dataTable,
  userAssets,
  assetData,
  setShowForm,
  setEditPortfolioData
) {
  dataTable!.destroy();
  dataTable!.init();
  const data: (string | number)[][] = [];

  userAssets.forEach(review => {
    if (assetData.assetData) {
      const assetDetails = assetData.assetData.find(
        asset => asset.Symbol === review.asset_symbol
      );
      if (assetDetails) {
        const risk = assetDetails.Rating;
        const riskReview = assetDetails.Asset_Review;
        const priceWithoutUSD = assetDetails.Price.replace("$", "").replace(
          ",",
          ""
        );
        const priceAsNumber = parseFloat(priceWithoutUSD);
        const value = `$${(priceAsNumber * review.total_amount).toFixed(2)}`;
        if (risk && riskReview && value) {
          data.push([
            review.asset_name,
            review.asset_symbol,
            review.total_amount,
            value,
            review.storage_type,
            risk,
            riskReview,
            review.id
          ]);
        }
      }
    }
  });
  dataTable!.insert({ data: data });

  // Edit button event listener
  dataTable.dom.addEventListener("click", e => {
    // if coming from asset edit button
    if ((e.target as HTMLElement).getAttribute("data-assetId")) {
      setShowForm(true);
      let id = (e.target as HTMLElement).getAttribute("data-assetId");

      let userAsset = userAssets.find(asset => asset.id == id);
      setEditPortfolioData(userAsset);
    }
  });
}
