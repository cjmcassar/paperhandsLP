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
            return ` <div class="flex gap-2 mr-2">
              <button class="bg-[#4b5563] text-white hover:ring-2 shadow-sm text-sm py-1 px-3 rounded-full" data-buyAssetId=${assetId[0].data}>Buy/Sell</button>

              <img class="border-[#4b5563] bg-[#4b5563] hover:ring-2 cursor-pointer inline-block text-white shadow-sm text-sm border-4 rounded-full" data-editAssetId=${assetId[0].data} width="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVklEQVR4nO2au2sVQRSH10ehhe9CFAs1WljkRkghwdbKQqMGUtpY+Af4PwhWVhaCnS/SaWtpTHxmi1QhRfABggZBEAvx5pMhc2E57PWqOTP3DJ4PFi7c3Zn5frM77M5MVTmO4ziO4xQOsB04B4zlrHQv0AHGMx77W9pxAFhknS5wNaX0JmAKmAfWyMtLYLdoz0FgSZwX2nUl1W02w3B4JeVjm3YAz1rO/wEc0e75GYzIh2cdGIm/dwJzLded1gxgiuHJ7xFtOQmsAu9ECOGx7DELbNEMYH4I8q9/I9/jPXAs/rcLeA4syOs0Rvs1A/JjQr5fCPvU5BsVW5Xv8QE4XqUAmMgovyB7MMp/HnDdW+Bo6QHU5uQzBvCmz20/SH4FOCyuO6T9DjBRSs9H+eXQ5lICqFvkOxuUp5QA6kTyRQRQJ5Q3H0CdWN50AHUGebMB1C3yJ4CPyvImA6gzypsMYESUOQp8+seXnEHy5gJYztjzJgO4Jcp7kljeXAAXG2VtA74nljcVwM8wodIo60wGeVMBvBBlXU8w4JkO4KYoK0xyyumsu8rypgK4Icq6DdwBLvf7ZleQNxXA07+sS0PeVACBs39Qx+a49qchby6Ar8B0WF1qlLkVOAVcAx4DX9DFVADNkf5RXMv7RlpMBpATD6DyO0AJ/BHAxwDKw8eAquDlcQ062hskupRDt21D1UZDmKMcZlXlA8AlyuF8pQ3r2+QeYp/76vJio+QD7HIvTLpWqQEuxC86CwNjN7ZlMrm4JGxpiSs840M6RtVHe8dxHMdxnOo/4RetNcoeAh5WwQAAAABJRU5ErkJggg==">

              <img  class="border-[#4b5563] bg-[#4b5563] hover:ring-2 cursor-pointer inline-block text-white shadow-sm text-sm border-4 rounded-full" data-delAssetId=${assetId[0].data} width="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwklEQVR4nO3VwQ0BQRSH8Ulog22ECsjGmQo4k9AAFVABFVCBrYAK6GCPKxKfjArM/z0c1neeN7/MXF4I/94MGAB5+HbADag+dXkeLye9SvoNoMCv4lfwMfnl9QooHb65VOCzA3xS4IMDvFfgjQO8VuCFAzxX4JEDPFTgrgPcUeC2A9xS4AZwN6BxtpkMx4CrAb4ENWzLQl8OwM4Aby3wygAvLfDEAI8tcN8A9yxwBjwENM5kMhwDZom7OZ6dvob/1bonTkhVq1riA2UAAAAASUVORK5CYII=">
            </div> `;
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
  setShowEditForm,
  setShowDeleteForm,
  setEditPortfolioData,
  setDeletePortfolioData,
  setBuySellData
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
    if ((e.target as HTMLElement).getAttribute("data-editAssetId")) {
      setShowEditForm(true);
      let id = (e.target as HTMLElement).getAttribute("data-editAssetId");

      let userAsset = userAssets.find(asset => asset.id == id);

      if (userAsset) {
        setEditPortfolioData({
          id: userAsset.id,
          asset_symbol: userAsset.asset_symbol,
          asset_name: userAsset.asset_name,
          storage_type: userAsset.storage_type,
          total_amount: userAsset.total_amount,
          transaction_date: userAsset.transaction_date
        });
      }
    }
  });

  // Delete button event listener
  dataTable.dom.addEventListener("click", e => {
    // if coming from asset edit button
    if ((e.target as HTMLElement).getAttribute("data-delAssetId")) {
      setShowDeleteForm(true);
      let id = (e.target as HTMLElement).getAttribute("data-delAssetId");

      if (id) {
        setDeletePortfolioData(id);
      }
    }
  });
}
