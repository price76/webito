import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import VerifyMobile from "./verify-mobile";

const register = async (formData) => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/trader/auth/register?lang=fa`, {
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

function Register() {

    const [userRegister, setUserRegister] = useState
        ({
            email: "",
            password: "",
            recaptcha: "1234",
        })
    const [verifyProcess, setVerifyProcess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserRegister({ ...userRegister, [name]: value });
    };

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data);
            setVerifyProcess(true)
        },
        onError: (error) => {
            console.error('Error submitting form:', error);
        },
    });
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(userRegister);
    };
    return (
        <>
            <Container className="mt-5">
                {
                    verifyProcess === false
                        ?
                        <Form onSubmit={handleRegisterSubmit}>
                            <legend>Register</legend>
                            <fieldset disabled={mutation.isPending}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="phone"> Phone </Form.Label>
                                    <Form.Control type="number" onChange={handleChange} name="email" placeholder="phone" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="password"> Password </Form.Label>
                                    <Form.Control type="password" onChange={handleChange} name="password" placeholder="password" />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        {mutation.isError && <Alert variant="danger"> {mutation.error.message}   </Alert>}
                                    </Col>
                                </Row>

                                <Button type="submit" className="w-100">
                                    {mutation.isPending ? 'submitting' : ' submit'}

                                </Button>
                            </fieldset>
                        </Form>
                        :
                        <VerifyMobile userRegister={userRegister} />
                }
            </Container>
        </>);
}

export default Register;