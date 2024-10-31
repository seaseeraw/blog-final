import { Container, Form, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Header = ({ searchPosts }) => {
  const { user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    // console.log("SEARCH");
    e.preventDefault();
    // searchPosts(searchValue);

    navigate("/search?query=" + searchValue);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {user ? (
                <Nav.Link as={Link} to="/mypost">
                  My Post
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>

          <Form className="d-flex g-2" onSubmit={handleOnSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchValue}
              onChange={handleOnChange}
            />
            <Button className="me-2" variant="outline-success" type="submit">
              Search
            </Button>
            {user ? (
              <Button variant="warning" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="success">Login</Button>
              </Link>
            )}
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
