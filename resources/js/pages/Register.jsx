import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../axios';
import {ThemeSelector} from '../components/ThemeChanger';
import {TextInput} from '../components/forms/TextInput.jsx'
import {useAuth} from '../contexts/AuthContext';
import {Button, Hero, Card} from 'react-daisyui';

export default function Register() {

    const {setUser, csrfToken} = useAuth();

    const [nameError, setNameError] = React.useState('');

    const [emailError, setEmailError] = React.useState('');

    const [passwordError, setPasswordError] = React.useState('');

    const handleError = (error) => {
        if (error.response.status === 422) {
            setNameError(error.response.data.errors.name ? error.response.data.errors.name[0] : '');
            setEmailError(error.response.data.errors.email ? error.response.data.errors.email[0] : '');
            setPasswordError(error.response.data.errors.password ? error.response.data.errors.password[0] : '');
        } else {
            console.log()
        }
    };

    // register user
    const handleSubmit = async (e) => {

        e.preventDefault();

        const {name, email, password, cpassword} = e.target.elements;
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: cpassword.value,
        };

        await csrfToken()

        try {
            const resp = await axios.post('/api/register', body);

            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/profile"/>;
            }

        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Hero className="bg-base-300" style={{margin:'0 0 -23px 0'}}>
            <Hero.Content className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-base-content ">
                    SPA!
                </a>

                <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg45degree">
                    <Card.Body>

                        <h1 className="text-base-content text-xl font-bold md:text-2xl ms-3">
                            Crie uma conta
                        </h1>

                        <form

                            action="#"
                            method="post"
                            onSubmit={handleSubmit}>

                            <TextInput error={nameError}
                                       label="Nome Completo"
                                       id='name'
                                       placeholder="Nome Completo"
                                       name="name"
                                       required/>

                            <TextInput error={emailError}
                                       label='E-mail'
                                       id='email'
                                       placeholder="nome@email.com.br"
                                       name="email"
                                       required/>

                            <TextInput error={passwordError}
                                       label='Senha'
                                       type="password"
                                       name="password"
                                       id="password"
                                       placeholder="••••••••"
                                       required/>

                            <TextInput error={passwordError}
                                       label='Repita a Senha'
                                       type="password"
                                       name="cpassword"
                                       id="cpassword"
                                       placeholder="••••••••"
                                       required/>

                            <div className="form-control border-0 justify-center my-2">
                                <Button className="btn-primary btn btn-md">
                                    Criar uma conta
                                </Button>
                            </div>

                            <p className="text-base-content ms-3 text-sm">
                                Já tem uma conta?{' '}
                                <Link
                                    to="/"
                                    className="link link-accent">
                                    Clique aqui para logar.
                                </Link>
                            </p>

                            <ThemeSelector/>

                        </form>
                    </Card.Body>
                </Card>
            </Hero.Content>
        </Hero>
    );
}
