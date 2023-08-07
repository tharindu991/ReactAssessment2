import React from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import "normalize.css";
import HttpServices from "./services/HttpServices";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  };
`;

const Container = styled.div`
  background-image: linear-gradient(
    0deg,
    rgba(170, 255, 169, 1) 11.2%,
    rgba(250, 251, 251) 91.1%
  );
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 25rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #00805b;
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.0625rem;
  margin-bottom: 0rem;
`;

const Subtitle = styled.h3`
  color: #00805b;
  font-weight: 100;
  text-align: center;
  letter-spacing: 0.0625rem;
  padding: 0 3rem;
`;

const Input = styled.input`
  color: #00805b;
  font-size: 1.125rem;
  background: none;
  border: none;
  border-bottom: 0.0625rem solid #00cc92;
  margin: 2.5rem 0;
  width: 90%;
  display: block;
  ::placeholder {
    color: #00cc92;
  }
  :focus {
    outline: none;
  }
`;

const Validation = styled.p`
  color: #00805b;
  font-weight: 100;
  font-size: 0.75rem;
`;

const Submit = styled.input`
  font-size: 1.3rem;
  background: none;
  color: #00805b;
  width: 75%;
  border-radius: 1.56rem;
  border: 0.0625rem solid #00cc92;
  margin: 2.5rem;
  padding: 0.5rem;
  cursor: pointer;
  :hover {
    background-color: #00cc92;
  }
  :focus {
    outline: none;
    background-color: #00cc92;
  }
`;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    HttpServices.post("/saveUser", { ...data }).then((response) => {
      if (response.data.status === 200) {
        alert("Success");
        reset();
        return;
      }
      alert("something went wrong!");
    });
  };

  return (
    <div>
      <GlobalStyle />
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Container>
        <Title>Humanitarian Operations</Title>
        <Subtitle>Create your account here</Subtitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", {
                required: "name required",
                pattern: {
                  value:
                    /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/i,
                  message: "Please enter a valid name",
                },
              })}
            />
            {errors && errors.name && (
              <Validation>
                <em>{errors.name.message}</em>
              </Validation>
            )}
          </div>
          <div>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "email required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,64}$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors && errors.email && (
              <Validation>
                <em>{errors.email.message}</em>
              </Validation>
            )}
          </div>
          <div>
            <Input
              type="phone"
              name="phone"
              placeholder="Phone"
              {...register("phone", {
                required: "phone required",
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})/i,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors && errors.phone && (
              <Validation>
                <em>{errors.phone.message}</em>
              </Validation>
            )}
          </div>
          <Submit type="submit" value="Register" />
        </form>
      </Container>
    </div>
  );
}

export default App;
