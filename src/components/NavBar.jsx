function NavBar() {
  return /**(
    <nav className="navbar">
      <Link to="/">
        <h1>MY BLOG</h1>
      </Link>
      {userLoggedIn && !isLoading && <p>HELLO, {userName}</p>}
      <p></p>
      {!userLoggedIn && !isLoading && <Link to="/log-in">LOG IN</Link>}
      <p></p>
      {!userLoggedIn && !isLoading && <Link to="/sign-up">SIGN UP</Link>}
      <p></p>
      {userLoggedIn && !isLoading && (
        <button onClick={handleLogOut}>LOG OUT</button>
      )}
    </nav>
  )**/;
}

export default NavBar;
