import React, { useContext, useState } from "react";
import { AssetDataContext } from "../../contexts/apiAssetDataContext";
import FAQModal from "../dashboard/FAQModal";
import HeaderTitle from "./HeaderTitle";
import ButtonGroup from "./ButtonGroup";
import AddCryptoForm from "./AddCryptoForm";

function RiskReviewHeader() {
  const [showForm, setShowForm] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const openFAQModal = () => setIsFAQModalOpen(true);
  const closeFAQModal = () => setIsFAQModalOpen(false);

  const handleAddNewCrypto = () => setShowForm(true);

  const assetData = useContext(AssetDataContext);

  const showLoading = !assetData.assetData;

  return (
    <div className="flex items-center py-5 gap-8">
      <HeaderTitle showLoading={showLoading} />
      <ButtonGroup
        handleAddNewCrypto={handleAddNewCrypto}
        openFAQModal={openFAQModal}
        showLoading={showLoading}
      />
      <FAQModal isOpen={isFAQModalOpen} onClose={closeFAQModal} />
      {showForm && <AddCryptoForm setShowForm={setShowForm} />}
    </div>
  );
}

export default RiskReviewHeader;
