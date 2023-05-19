import React, { createContext, useReducer, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebaseClient";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
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

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false; // Component is unmounted
    };
  }, []);

  const fetchUserTransactions = async () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userAssetsQuery, querySnapshot => {
      const userTransactions: UserTransaction[] = [];
      querySnapshot.forEach(userAssetDoc => {
        const transactionsQuery = query(
          collection(userAssetDoc.ref, "transactions")
        );
        const transactionsUnsubscribe = onSnapshot(
          transactionsQuery,
          transactionsSnapshot => {
            transactionsSnapshot.forEach(transactionDoc => {
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
            dispatch({ type: "SET_USER_TRANSACTIONS", userTransactions });
          }
        );
        return transactionsUnsubscribe;
      });
      return unsubscribe;
    });
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
