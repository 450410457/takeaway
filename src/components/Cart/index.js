import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { decreCount, increCount, cleraCart } from '../../store/modules/takeaway'
import { useState } from 'react'

const Cart = () => {
  const { cartList } = useSelector(state => state.foods)
  const totalPrice = cartList.reduce((pre, item) => pre + item.price * item.count, 0)
  const totalCount = cartList.reduce((pre, item) => pre + item.count, 0)

  const dispatch = useDispatch()
  // カートの表示/非表示を制御する
  const [visible, setVisible] = useState(false)
  const onShow = () => {
    if (cartList.length > 0) {
      setVisible(!visible)
    }
  }
  return (
    <div className="cartContainer">
      {/* マスクレイヤーは、可視のクラス名(visible)を追加することで表示できます */}
      <div
        className={classNames('cartOverlay', visible && 'visible')}
        onClick={() => { setVisible(false) }}
      />
      <div className="cart" onClick={onShow}>
        {/* クラス名(fill)より、カートのステータスを切り替えます*/}
        {/* カート内の商品の数 */}
        <div className={classNames('icon', { fill: cartList.length > 0 })}>
          {cartList.length > 0 && <div className="cartCornerMark">{totalCount}</div>}
        </div>
        {/* カート内の商品の合計金額 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice && totalPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">配送料金 500円</span>
        </div>
        {/* 商品の数より、表示文言が違う：0件 or 0件以外 */}
        {cartList.length > 0 ? (
          <div className="goToPreview">カートを表示</div>
        ) : (
          <div className="minFee">注文してください</div>
        )}
      </div>
      {/* divは、可視のクラス名(visible)を追加することで表示できます */}
      <div className={classNames('cartPanel', visible && 'visible')}>
        <div className="header">
          <span className="text">カート</span>
          <span className="clearCart" onClick={() => { dispatch(cleraCart()) }}>
            カートを空にする
          </span>
        </div>

        {/* カート一覧 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className={classNames(item.count > 0 ? "cartItemVisible" : "cartItemDisvisible")} key={item.id} >
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count}
                    onPlus={() => { dispatch(increCount({ id: item.id })) }}
                    onMinus={() => { dispatch(decreCount({ id: item.id })) }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}

export default Cart
