// store編集
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
  name: "foods",
  initialState: {
    // 商品List
    foodsList: [],
    // menuList active index
    activeIndex: 0,
    // cartList
    cartList: []
  },
  reducers: {
    // 商品List
    setFoodsList: (state, action) => {
      state.foodsList = action.payload;
    },
    // 
    changeActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    addCart: (state, action) => {
      const item = state.cartList.find(item => item.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.cartList.push({ ...action.payload, count: 1 });
      }
    },
    // 商品追加
    increCount: (state, action) => {
      const item = state.cartList.find(item => item.id === action.payload.id);
      item.count++;
    },
    //商品削除
    decreCount: (state, action) => {
      const item = state.cartList.find(item => item.id === action.payload.id);
      if (item.count === 0) {
        return
      }
      item.count--;
      if (item.count === 0) {
        state.cartList.splice(item, 1);
      }
    },
    // カートを空にする
    cleraCart: (state) => {
      state.cartList = [];
    }
  }
})

// 非同期処理 (情報取得)
const { setFoodsList, changeActiveIndex, addCart, increCount, decreCount, cleraCart } = foodsStore.actions
const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3004/takeaway");
    dispatch(setFoodsList(res.data));
  }
}

export { fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, cleraCart };
const reducers = foodsStore.reducer;
export default reducers;
