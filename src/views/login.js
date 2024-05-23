
import { Context } from "../store/context"
import { useContext, useEffect, useState } from "react"
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Form, Button, Container,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const Login = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [validated, set_Validated] = useState(false);
    const [form_Data, set_Form_Data] = useState({
        password: "",
        email: ""
    });

    const submitFn = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        set_Validated(true);

        if (set_Validated) {
            store.user = form_Data
            actions.handleSubmitLogin()
            .then(response=>{if(response){navigate("/")}})
            .catch(error=>console.log(error))
      
        }
    }
    const chngFn = (event) => {
        const { name, value } = event.target;
        set_Form_Data({
            ...form_Data,
            [name]: value,
        });
        actions.handleOnchange(event)
        console.log(store.user)
    };


    return  <Container className="mt-5 col-4">
            <h1 className="h3 mb-3 ">Ingreso</h1>
            <Form noValidate validated={validated} onSubmit={submitFn}>
                <Form.Group className="mt-5 mb-2" controlId="email">

                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={form_Data.email}
                        onChange={chngFn}
                        required
                        isInvalid={
                            validated &&
                            !/^\S+@\S+\.\S+$/.test(form_Data.email)
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        Ingresar mail valido.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2 mb-2" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={form_Data.password}
                        onChange={chngFn}
                        minLength={6}
                        required
                        isInvalid={
                            validated && form_Data.password.length < 6
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        Contraseña debe contener al menos 6 characteres
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex mt-5 ms-3 ">
                <Button className='me-4 col-5 ' type="submit">Submit</Button>
                <GoogleLogin
                        
                        onSuccess={(credentialResponse) => {
                            const credentialResponsedecoded = jwtDecode(credentialResponse.credential)
                            actions.handleSubmitGoogleuser(credentialResponsedecoded)
                            .then(response=>{if(response){navigate("/")}})
                            .catch(error=>console.log(error))
                            console.log(credentialResponsedecoded)
                      
                          

                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </Form>
        </Container>
    
}

export default Login