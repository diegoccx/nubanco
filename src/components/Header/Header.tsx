import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const suggestions = ['didi','diego', 'diana', 'dionisio' ]; // Lista de sugestões

const Header: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    // Encontrar a primeira sugestão que começa com o valor digitado
    const match = suggestions.find((s) => s.toLowerCase().startsWith(value.toLowerCase()));
    setSuggestion(match && match !== value ? match : '');
  };

  const applySuggestion = () => {
    if (suggestion) {
      setSearch(suggestion);
      setSuggestion('');
    }
  };

  return (
    <header className="flex flex-v-center flex-space-between">
      <div className="header-profile flex flex-1">
        <Link to="/profile">
          <div className="profile-photo" style={{ backgroundImage: 'url("images/diego-foto.jpeg")' }} />
        </Link>
      </div>
      <div className="header-center">
        <div className="header-search flex flex-v-center">
          <span
            tabIndex={0}
            role="button"
            onClick={() => inputRef.current?.focus()}
            className="material-symbols-outlined no-select"
          >
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            name="search"
            id="search"
            placeholder="Buscar"
            value={search}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault(); // Evita a tabulação padrão
                applySuggestion();
              }
            }}
          />
          {suggestion && (
            <div className="suggestion-box" onClick={applySuggestion}>
              {suggestion}
            </div>
          )}
        </div>
      </div>
      <div className="header-buttons flex flex-1 flex-v-center flex-end">
        <Link to="/transactions" className="header-button flex flex-v-center flex-h-center">
          <span className="material-symbols-outlined">equalizer</span>
        </Link>
        <Link to="/cards" className="header-button flex flex-v-center flex-h-center">
          <span className="material-symbols-outlined">credit_card</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
