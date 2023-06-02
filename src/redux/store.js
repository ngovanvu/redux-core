import { counterReducer } from "./countReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { todosReducer } from "./todosReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//! store chứa reducer
//! dispatch là thằng đưa action đến với store
//! getState là nhận tất cả các giá trị mà reducer trả về
//! middleware đứng trên dispatch ở giữa action và store nó có thể chặn những thằng action mà nó muốn chặn (nó như một thằng bảo vệ giữa action xấu với store)
//! next(action) cho phép action đó chạy qua vào store
const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["count"],
  blacklist: ["todos"],
};
const rootReducer = combineReducers({
  count: counterReducer,
  todos: todosReducer,
});
// const middleware = (store) => (next) => (action) => {
//   console.log("store", { store, action, next });
//   if (action.payload?.name?.includes("aaa")) {
//     next({
//       type: action.type,
//       payload: {
//         ...action.payload,
//         name: "***",
//       },
//     });
//   } else next(action);
// };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
