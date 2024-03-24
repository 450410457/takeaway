import './index.scss'

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="menu">
        <div className="menu-item active">
          メニュー<span className="menu-active-bar"></span>
        </div>
        <div className="menu-item" >
          評価<span className="menu-comment">999</span>
        </div>
        <div className="menu-item">店舗</div>
      </div>

      <div className="menu-search">
        <div className="menu-form">
          <div className="menu-search-icon"></div>
          <div className="menu-search-text">Search</div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
