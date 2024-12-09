import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import VerifyForgotPassword from "./verify-forgot-password";

const forgotPassword = async (formData) => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/trader/auth/forgotPassword?lang=fa`, {
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


function ForgotPassword() {
    const [phoneForgotPassword, setPhoneForgotPassword] = useState
        ({
            email: ""
        });
    const [verifyProcess, setVerifyProcess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhoneForgotPassword({ ...phoneForgotPassword, [name]: value });
    };
    const mutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data);
            setVerifyProcess(true);
        },
        onError: (error) => {
            console.error('Error submitting form:', error);
        },
    });
    const handleforgotPassword = async (e) => {
        e.preventDefault();
        mutation.mutate(phoneForgotPassword);
    };
    return (
        <>
            <Container className="mt-5">
                {
                    verifyProcess === false
                        ?
                        <Form onSubmit={handleforgotPassword}>
                            <legend>Forgot Password</legend>
                            <fieldset disabled={mutation.isPending}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="phone"> Phone </Form.Label>
                                    <Form.Control type="number" name="email" onChange={handleChange} placeholder="phone" required />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        {mutation.isError && <Alert variant="danger"> {mutation.error.message}   </Alert>}
                                    </Col>
                                </Row>
                                <Button type="submit" className="w-100">
                                    {mutation.isPending ? 'submitting' : 'submit '}
                                </Button>
                            </fieldset>
                        </Form>
                        :
                        <VerifyForgotPassword phoneForgotPassword={phoneForgotPassword} />

                }
            </Container>
        </>);
}

export default ForgotPassword;