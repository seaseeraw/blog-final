import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Added Spinner and Alert for better loading/error handling
import Header from "../components/Navbar";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer"; // Make sure the casing matches your component file
import { fetchPosts, fetchSearchPost } from "../utils/axiosHelper";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const searchPosts = async (query) => {
    //call search api
    const response = await fetchSearchPost(query);

    if (response.status == "success") {
      setPosts(response.data);
    } else {
      setPosts([]);
    }
  };

  useEffect(() => {
    searchPosts(query);
  }, [location]);

  return (
    <>
      <Header searchPosts={searchPosts} />

      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ width: "66%", margin: "0 auto" }}
      >
        <Row className="mt-4">
          <Col className="text-center">
            <h1> Searching....</h1>
            <hr />
            <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SearchPage;
