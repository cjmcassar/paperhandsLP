import React, { createContext, useReducer, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebaseClient";

type UserAsset = {
  uid: string;
  asset_name: string;
  asset_symbol: string;
  total_amount: number;
  storage_type: string;
  id: string;
};

type UserAssetsState = {
  userAssets: UserAsset[];
  isLoading: boolean;
};

type UserAssetsAction = { type: "SET_USER_ASSETS"; userAssets: UserAsset[] };

const initialState: UserAssetsState = {
  userAssets: [],
  isLoading: true
};

const reducer = (
  state: UserAssetsState,
  action: UserAssetsAction
): UserAssetsState => {
  switch (action.type) {
    case "SET_USER_ASSETS":
      return { ...state, userAssets: action.userAssets, isLoading: false };
    default:
      return state;
  }
};

const UserAssetsDataContext = createContext<
  [UserAssetsState, React.Dispatch<UserAssetsAction>]
>([initialState, () => initialState]);

const UserAssetsDataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, loading, error] = useAuthState(auth);

  const fetchUserAssets = () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userAssetsQuery, querySnapshot => {
      const userAssets: UserAsset[] = [];
      querySnapshot.forEach(doc => {
        const data = { ...doc.data(), id: doc.id };
        userAssets.push(data as UserAsset);
      });
      dispatch({ type: "SET_USER_ASSETS", userAssets });
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchUserAssets();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return (
    <UserAssetsDataContext.Provider value={[state, dispatch]}>
      {children}
    </UserAssetsDataContext.Provider>
  );
};

export { UserAssetsDataProvider, UserAssetsDataContext };
