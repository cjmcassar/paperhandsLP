import React, { createContext, useReducer, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebaseClient";
import { collection, getDocs, query, where } from "firebase/firestore";
import { format, fromUnixTime } from "date-fns";

type UserTransaction = {
  uid: string;
  transaction_amount: number;
  transaction_price: string;
  transaction_type: "buy" | "sell";
  transaction_date: string;
  id: string;
  parent_id: string;
};

type UserTransactionsState = {
  userTransactions: UserTransaction[];
  isLoading: boolean;
};

type UserTransactionsAction = {
  type: "SET_USER_TRANSACTIONS";
  userTransactions: UserTransaction[];
};

const initialState: UserTransactionsState = {
  userTransactions: [],
  isLoading: true
};

const reducer = (
  state: UserTransactionsState,
  action: UserTransactionsAction
): UserTransactionsState => {
  switch (action.type) {
    case "SET_USER_TRANSACTIONS":
      return {
        ...state,
        userTransactions: action.userTransactions,
        isLoading: false
      };
    default:
      return state;
  }
};

const UserTransactionsDataContext = createContext<
  [UserTransactionsState, React.Dispatch<UserTransactionsAction>]
>([initialState, () => initialState]);

const UserTransactionsDataProvider: React.FC = ({ children }) => {
  const [transactionState, dispatch] = useReducer(reducer, initialState);
  const [user, loading, error] = useAuthState(auth);

  const fetchUserTransactions = async () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const userAssetsSnapshots = await getDocs(userAssetsQuery);
    const userTransactions: UserTransaction[] = [];

    const transactionsPromises: Promise<void>[] = [];

    userAssetsSnapshots.forEach(userAssetDoc => {
      const transactionsPromise = getDocs(
        collection(userAssetDoc.ref, "transactions")
      ).then(transactionsSnapshots => {
        transactionsSnapshots.forEach(transactionDoc => {
          const transactionData = transactionDoc.data();
          const transactionDateSeconds =
            transactionData.transaction_date.seconds;
          userTransactions.push({
            uid: user.uid,
            transaction_amount: transactionData.transaction_amount,
            transaction_price: transactionData.transaction_price,
            transaction_type: transactionData.transaction_type,
            transaction_date: format(
              fromUnixTime(transactionDateSeconds),
              "yyyy-MM-dd"
            ),
            id: transactionDoc.id,
            parent_id: transactionData.parent_id
          });
        });
      });
      transactionsPromises.push(transactionsPromise);
    });

    await Promise.all(transactionsPromises);
    dispatch({ type: "SET_USER_TRANSACTIONS", userTransactions });
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [user]);

  return (
    <UserTransactionsDataContext.Provider value={[transactionState, dispatch]}>
      {children}
    </UserTransactionsDataContext.Provider>
  );
};

export { UserTransactionsDataProvider, UserTransactionsDataContext };
