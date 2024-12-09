import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

const resetPassword = async (formData) => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/trader/auth/resetPassword?lang=fa`, {
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


function ResetPassword({ userVerifyCode }) {

    const [resetPasswordData, setResetPasswordData] = useState
        ({
            email: userVerifyCode.email,
            code: userVerifyCode.code,
            password: "",
            recaptcha: "123"
        })
    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data);
        },
        onError: (error) => {
            console.error('Error submitting form:', error);
        },
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResetPasswordData({ ...resetPasswordData, [name]: value });
    };
    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(resetPasswordData);
    };
    return (
        <>
            <Form onSubmit={handleResetPasswordSubmit}>
                <legend>Verify Forgot Password</legend>
                <fieldset disabled={mutation.isPending}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password"> Password </Form.Label>
                        <Form.Control type="password" name="password" placeholder="password" onChange={handleChange} required />
                    </Form.Group>
                    <Row>
                        <Col>
                            {mutation.isError && <Alert variant="danger"> {mutation.error.message}   </Alert>}
                            {mutation.isSuccess && <Alert variant="success">Password change</Alert>}

                        </Col>
                    </Row>
                    <Button type="submit" className="w-100">
                        {mutation.isPending ? 'submitting' : 'submit '}
                    </Button>
                </fieldset>
            </Form>
        </>
    );
}

export default ResetPassword;