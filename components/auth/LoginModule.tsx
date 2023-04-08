import React, { useEffect, useState } from "react";
import LoginFormModal from "./components/LoginFormModal";
import SignUpModal from "./components/SignUpFormModal";
import { getAuth } from "firebase/auth";

import { useRouter } from "next/dist/client/router";
function LoginModule() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen min-w-screen">
        <button
          className="bg-primary hover:opacity-80 filter drop-shadow-xl rounded-2xl py-4 px-10 text-white text-2xl"
          onClick={openModal}
        >
          <span className="mr-3">🪵</span> Login
        </button>
      </div>
      {modalOpen && <LoginFormModal onClose={closeModal} />}
    </>
  );
}

export default LoginModule;
