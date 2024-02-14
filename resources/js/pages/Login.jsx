import {useState} from 'react'
import {Link, Navigate} from 'react-router-dom';
import axios from '../axios';
import {useAuth} from '../contexts/AuthContext';
import {ThemeSelector} from '../components/ThemeChanger';
import {Button, Alert, Input, Hero, Card} from 'react-daisyui';

export default function Login() {

    const {setUser, csrfToken} = useAuth();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = e.target.elements;
        const body = {
            email: email.value,
            password: password.value,
        };
        await csrfToken();
        try {
            const resp = await axios.post('/api/login', body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to='/profile'/>;
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <Hero className='p-2 bg-base-300 min-h-full h-full items-center'>
            <Hero.Content
                className='flex lg:flex-row-reverse flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0 justify-center'>

                <div className='text-center lg:text-left p-4 '>
                    <h1 className='text-base-content text-5xl font-bold'>Company!</h1>
                    <p className='py-6 text-base-content'>
                        Magnis ultricies sed volutpat et urna egestas nisl aliquet adipiscing suspendisse mollis a sit accumsan scelerisque nascetur curabitur nisi nascetur auctor leo consectetur ad ultrices.Et condimentum tellus.
                    </p>

                    <ThemeSelector/>

                </div>

                <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg45degree">


                    <form className='card-body' action='#' onSubmit={handleSubmit}>

                        <div className='form-control bg-transparent border-0'>
                            <label className='label' htmlFor='email'>
                                <span className='label-text'>E-mail</span>
                            </label>
                            <Input placeholder='email@email.com'
                                   className='input input-bordered w-full max-w-xs'
                                   type='email'
                                   name='email'
                                   id='email'
                                   required/>
                        </div>

                        <div className='form-control w-full max-w-xs bg-transparent border-0'>
                            <label className='label' htmlFor='password'>
                                <span className='label-text'>Senha</span>
                            </label>
                            <Input placeholder='••••••••'
                                   className='input input-bordered w-full max-w-xs'
                                   type='password'
                                   name='password'
                                   id='password'
                                   required/>
                            <label className='label'>
                                <a href='#' className='label-text-alt link link-hover'>Esqueceu a senha?</a>
                            </label>
                        </div>

                        <div className='form-control bg-transparent border-0 justify-center'>
                            <Button className="btn-primary btn btn-md"
                                    type='submit'>Logar</Button>
                        </div>

                        {error && (
                            <Alert status={'error'}
                                   icon={<svg xmlns='http://www.w3.org/2000/svg'
                                              className='stroke-current shrink-0 h-6 w-6'
                                              fill='none'
                                              viewBox='0 0 24 24'>
                                       <path strokeLinecap='round'
                                             strokeLinejoin='round'
                                             strokeWidth='2'
                                             d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                                   </svg>}>
                                <span>{error}</span>
                            </Alert>
                        )}

                        <div className='form-control mt-4 bg-transparent border-0'>
                            <p className='text-base-content'>
                                Não tem uma conta ainda?{' '}
                                <Link
                                    to='/register'
                                    className='link link-secondary'>
                                    Registre-se
                                </Link>
                            </p>
                        </div>

                    </form>
                </Card>

            </Hero.Content>
        </Hero>

    );
}
