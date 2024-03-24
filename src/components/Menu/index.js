import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { changeActiveIndex } from '../../store/modules/takeaway'
import './index.scss'

const Menu = () => {
  const { foodsList, activeIndex } = useSelector(state => state.foods)
  const dispetch = useDispatch()
  const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }))
  return (
    <nav className="list-menu">
      {/* クラス名(active)を追加すると、アクティブ状態になります */}
      {menus.map((item, index) => {
        return (
          <div
            onClick={() => dispetch(changeActiveIndex(index))}
            key={item.tag}
            className={classNames(
              'list-menu-item',
              activeIndex === index ? 'active' : ""
            )}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
