import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { traderContext } from "./tarderContext";

const verifyMobile = async (formData) => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/trader/auth/active?lang=fa`, {
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


function VerifyMobile({ userRegister }) {
    const [userVerifyCode, setUserVerifyCode] = useState
        ({
            email: userRegister.email,
            code: "",

        })
    const trader = useContext(traderContext);

    const mutation = useMutation({
        mutationFn: verifyMobile,
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data);
            trader.setTraderData(data);

        },
        onError: (error) => {
            console.error('Error submitting form:', error);
        },
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserVerifyCode({ ...userVerifyCode, [name]: value });
    };


    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(userVerifyCode);
    };
    return (
        <>
            <Form onSubmit={handleVerifySubmit}>
                <legend>Verify Mobile</legend>
                <fieldset disabled={mutation.isPending}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="code"> Code </Form.Label>
                        <Form.Control type="text" name="code" onChange={handleChange} placeholder="code"
                            value={userVerifyCode.code}
                            required />
                    </Form.Group>
                    <Row>
                        <Col>
                            {mutation.isError && <Alert variant="danger"> {mutation.error.message}   </Alert>}
                            {mutation.isSuccess && <Alert variant="success">Register is ok </Alert>}

                        </Col>
                    </Row>
                    <Button type="submit" className="w-100">
                        {mutation.isPending ? 'submitting' : 'submit '}

                    </Button>
                </fieldset>
            </Form>
        </>);
}

export default VerifyMobile;