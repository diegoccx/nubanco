import { Link } from 'react-router-dom';

// components
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

const Profile: React.FC = () => (
  <Layout>
    <Divider />

    <h1 className='title'>Conta</h1>

    <div className='account-photo' style={{ backgroundImage: `url("images/diego-foto.jpeg")` }} />


    <div className='center'>
      <h2>DIEGO CARDOSO</h2>
      <p className='flex flex-v-center flex-h-center'>
        @diegoccx &nbsp;
        <span className='material-symbols-outlined'>qr_code</span>
      </p>
    </div>

    <Divider />

    <div className='account'>
      <Link to='/home' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>home</span>
        Conta
      </Link>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>account_circle</span>
        Perfil
      </Link>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>school</span>
        ajuda
      </Link>
      <Link to='/profile' className='flex flex-v-center flex-space-between'>
        <div className='flex flex-v-center flex-h-center'>
          <span className='material-symbols-outlined'>inbox</span>
          Mensagens
        </div>
        <span className='notification flex flex-v-center flex-h-center'>4</span>
      </Link>
    </div>

    <Divider />

    <div className='account'>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>verified_user</span>
        Segurança e privacidade
      </Link>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>notifications</span>
        Configurações de notificação
      </Link>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>contrast</span>
        Aparência
      </Link>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>grade</span>
        Novas funcionalidades
      </Link>
    </div>

    <Divider />

    <div className='account'>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>token</span>
        Sobre nós
      </Link>
      <Link to='/profile' className='flex flex-v-center'>
        <span className='material-symbols-outlined'>power_settings_new</span>
        Sair
      </Link>
    </div>

    <Divider />

    <footer className='center no-select'>
      v.1.0.12
      <br />
      DiegoBanking Ltd.
    </footer>

    <Divider />
  </Layout>
);

export default Profile;
