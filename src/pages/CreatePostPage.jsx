import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Header from "../components/Navbar";
import Footer from "../components/footer";
import { createPost, fetchPost, updatePost } from "../utils/axiosHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../utils/AuthContext";

const CreatePostPage = () => {
  const { setGlobalMessage } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pid = queryParams.get("id");

  const post = {
    id: "id",
    title: "Post Title",
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    author: "John Doe",
    own: true,
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const tempData = { ...formData };
    tempData[e.target.name] = e.target.value;
    setFormData(tempData);

    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (pid) {
      response = await updatePost(pid, formData);
    } else {
      response = await createPost(formData);
    }

    if (response.status == "success") {
      // toast.success(response.message);
      setGlobalMessage(response.message);

      setTimeout(() => {
        navigate("/mypost");
      }, 1000);
    } else {
      toast.error(response.message.details);
    }
  };

  const fillFormData = async (postId) => {
    const response = await fetchPost(postId);

    if (response.status == "success") {
      console.log(response.data);
      setFormData({
        title: response.data.title,
        content: response.data.content,
        image: response.data.image,
      });
    } else {
      console.log("ERROR fetching Post data");
    }
  };

  useEffect(() => {
    if (pid) {
      fillFormData(pid);
    }
  }, []);

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center"
        style={{ width: "66%", margin: "0 auto" }}
      >
        <Row style={{ width: "100%" }}>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>{pid ? "Update Post" : "Create Post"} </h1>
            <hr />
            <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId="formContent" className="mt-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter post content"
                  required
                  name="content"
                  value={formData.content}
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId="formImageUrl" className="mt-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                {pid ? "Update Post" : "Create Post"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CreatePostPage;
