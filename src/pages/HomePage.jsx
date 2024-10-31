import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Added Spinner and Alert for better loading/error handling
import Header from "../components/Navbar";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer"; // Make sure the casing matches your component file
import { fetchPosts, fetchSearchPost, likePost } from "../utils/axiosHelper";
import { useAuth } from "../utils/AuthContext";

const HomePage = () => {
  const { setGlobalMessage } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const searchPosts = async (query) => {
    //call search api
    const response = await fetchSearchPost(query);

    if (response.status == "success") {
      setPosts(response.data);
    }
  };

  const fillPosts = async () => {
    setLoading(true); // Reset loading state when fetching posts
    try {
      const response = await fetchPosts();

      if (response?.status === "error") {
        setPosts([]);
        throw new Error(response.message);
      } else {
        setPosts(response.data); // Ensure you access the correct data property
      }
    } catch (err) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const likeFunction = async (id) => {
    const response = await likePost(id);

    if (response.status == "success") {
      fillPosts();
    } else {
      setGlobalMessage(response.message);
    }
  };

  useEffect(() => {
    fillPosts();
  }, []);

  if (loading)
    return (
      <div className="spinner-wrapper">
        <Spinner animation="border" />
      </div>
    ); // Use a spinner for loading state

  if (error) return <Alert variant="danger">Error: {error}</Alert>; // Use an alert for error messages

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
            <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  likeFunction={likeFunction}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
