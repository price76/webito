import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import ResetPassword from "./reset-password";


const verifyForgotPassword = async (formData) => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/trader/auth/verifyForgotPassword?lang=fa`, {
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

function VerifyForgotPassword({ phoneForgotPassword }) {
    const [userVerifyCode, setUserVerifyCode] = useState
        ({
            email: phoneForgotPassword.email,
            code: "",
        })
    const [verfiedCodeStatus, setVerfiedCodeStatus] = useState(false);

    const mutation = useMutation({
        mutationFn: verifyForgotPassword,
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data);
            setVerfiedCodeStatus(true);
        },
        onError: (error) => {
            console.error('Error submitting form:', error);
        },
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserVerifyCode({ ...userVerifyCode, [name]: value });
    };


    const handleVerifyForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(userVerifyCode);
    };
    return (
        <>
            {
                verfiedCodeStatus === false
                ?
                <Form onSubmit={handleVerifyForgotPasswordSubmit}>
                    <legend>Verify Forgot Password</legend>
                    <fieldset disabled={mutation.isPending}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="code"> code </Form.Label>
                            <Form.Control type="number" name="code" placeholder="code" onChange={handleChange} required />
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
                <ResetPassword userVerifyCode={userVerifyCode} />
            }
        </>
    );
}

export default VerifyForgotPassword;