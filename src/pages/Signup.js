import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useAsyncError } from "react-router-dom";
import "./Signup.css";
import ProfileImg from "../assets/abhishek.jpg";
import { upload } from "@testing-library/user-event/dist/upload";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // image upload states
  const [image, setImage] = useState(null);
  const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // create profile image file uploding "validateImg" function
  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    // using cloudinary.com
    data.append("upload_preset", "rdugtang");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dzx0bzxky/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  // create handleSignup function
  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Please uplode your profile picture");
    const url = await uploadImage(image);
    console.log(url);

    // signup the user
  }

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="text-center">Create account</h1>
            <div className="signup-profile-pic__container">
              <img
                src={imagePreview || ProfileImg}
                className="signup-profile-pic"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              {/* select profile image  */}
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg"
                onChange={validateImg}
              ></input>
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {upladingImg ? "Signing you up..." : "Signup"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already hava an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
