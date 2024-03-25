import {useState} from 'react'
import {Link, Navigate} from 'react-router-dom';
import axios from '../axios';
import {useAuth} from '../contexts/AuthContext';
import {ThemeSelector} from '../components/ThemeChanger';
import {Button, Input, Hero, Card} from 'react-daisyui';
import {ErrorAlert} from "../components/forms/ErrorAlert.jsx";

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
                return <Navigate to='/dashboard'/>;
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
            }else{
                setError("O sistema encontrou um erro. Por favor tente novamente mais tarde");
                console.log(error.response.data)
            }
        }
    };

    return (
        <Hero className='bg-base-300 min-h-full h-full items-center' style={{margin:'0 0 -23px 0'}}>
            <Hero.Content
                className='flex lg:flex-row-reverse flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0 justify-center'>

                <div className='text-center lg:text-left p-4 '>
                    <h1 className='text-accent text-5xl font-bold text-center'>Viatécnica</h1>
                    <p className='pt-6 pb-3 text-base-content'>
                        Consectetur eu himenaeos inceptos a enim eget ullamcorper a a tincidunt consectetur a ultrices
                        vitae ut eu condimentum posuere a lobortis nibh a dui leo mi vulputate. Eget himenaeos maecenas
                        quam a a duis orci nec vel quam a hac vitae mus vestibulum vestibulum at a turpis adipiscing
                        egestas cum condimentum dapibus fermentum. Fames ad lectus ante aliquet ridiculus eu nascetur
                        leo senectus curabitur interdum dapibus vestibulum egestas ullamcorper ac magna suspendisse
                        interdum nisl a potenti litora magnis fringilla vivamus.
                    </p>
                    <p className='pb-6 text-base-content'>
                        Tellus rhoncus vestibulum malesuada vel nulla risus leo nisl a parturient eu non habitasse nisi
                        a adipiscing a. Orci eu vestibulum venenatis dignissim suspendisse suspendisse nostra
                        consectetur facilisi odio pulvinar elit class vehicula condimentum adipiscing felis metus
                        adipiscing facilisis dui arcu condimentum ultrices inceptos maecenas.
                    </p>

                </div>

                <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg45degree">

                    <form className='card-body' action='#' onSubmit={handleSubmit}>

                        <div className='form-control border-0'>
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

                        <div className='form-control w-full max-w-xs  border-0'>
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
                                <Link to='#'
                                    className='label-text-alt link link-accent'>
                                    Esqueceu a senha?
                                </Link>
                            </label>
                        </div>

                        <div className='form-control  border-0 justify-center'>
                            <Button className="btn-primary btn btn-md"
                                    type='submit'>Logar</Button>
                        </div>

                        {error && <ErrorAlert>{error}</ErrorAlert>}

                        <div className='form-control mt-4 border-0'>
                            <p className='text-base-content'>
                                Não tem uma conta ainda?{' '}
                                <Link
                                    to='/register'
                                    className='link link-accent'>
                                    Registre-se
                                </Link>
                            </p>
                        </div>

                    </form>
                </Card>
                <ThemeSelector/>
            </Hero.Content>
        </Hero>

    );
}
