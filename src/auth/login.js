import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { traderContext } from "./tarderContext";

const login = async (formData) => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/trader/auth/login?lang=fa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
    }

    return response.json();
};

function Login() {
    const [userInformation, setUserInformation] = useState
        ({
            email: "",
            password: "",
            recaptcha: "1234",
        })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInformation({ ...userInformation, [name]: value });
    };
    const trader = useContext(traderContext);

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data);
            trader.setTraderData(data);

        },
        onError: (error) => {
            console.error('Error submitting form:', error);
        },
    });
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(userInformation);
    };

    return (
        <>
            <Container className="mt-5">
                <Form onSubmit={handleLoginSubmit}>
                    <legend>Login</legend>
                    <fieldset disabled={mutation.isPending}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="phone"> Phone </Form.Label>
                            <Form.Control type="text" name="email" onChange={handleChange} placeholder="phone"
                                value={userInformation.phone}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password"> Password </Form.Label>
                            <Form.Control type="password" onChange={handleChange} name="password" placeholder="password"
                                value={userInformation.password}
                            />
                        </Form.Group>
                        <Row className="my-3">
                            <Col md="6">
                                <Button variant="outline-info" ><Link to="/register">Register</Link></Button>
                            </Col>
                            <Col md="6">
                                <Button variant="outline-info" ><Link to="/forgotpassword">Forgot Password</Link></Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {mutation.isError && <Alert variant="danger"> {mutation.error.message}   </Alert>}
                                {mutation.isSuccess && <Alert variant="success">Login is ok </Alert>}

                            </Col>
                        </Row>
                        <Button type="submit" className="w-100">
                            {mutation.isPending ? 'submitting' : 'submit '}
                        </Button>
                    </fieldset>
                </Form>
            </Container>
        </>
    );
}

export default Login;