import { Link } from 'react-router-dom';

const Actions: React.FC = () => (
  <div className='actions flex flex-v-center flex-h-center'>
    <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
      <Link to='/add' className='flex flex-v-center flex-h-center'>
        <span className='material-symbols-outlined'>add</span>
      </Link>
      <span className='text-shadow'>Adicionar Dinheiro</span>
    </div>
    <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
      <Link to='/home' className='flex flex-v-center flex-h-center'>
        <span className='material-symbols-outlined'>sync</span>
      </Link>
      <span className='text-shadow'>Exchange</span>
    </div>
    <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
      <Link to='/home' className='flex flex-v-center flex-h-center'>
        <span className='material-symbols-outlined'>page_info</span>
      </Link>
      <span className='text-shadow'>Detalhes</span>
    </div>
    <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
      <button type='button' className='flex flex-v-center flex-h-center'>
        <span className='material-symbols-outlined'>more_horiz</span>
      </button>
      <span className='text-shadow'>Mais</span>
    </div>
  </div>
);

export default Actions;
