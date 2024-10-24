import { useState } from 'react';


function Dictionary() {
  const [language, setLanguage] = useState('English'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [results, setResults] = useState([]); 
  const [error, setError] = useState(''); 
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const handleSearch = async () => {
    setError(''); 
    if (searchTerm) {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setResults(data.map(entry => ({
            meaning: entry.meanings[0].definitions[0].definition,
            examples: entry.meanings[0].definitions[0].example ? [entry.meanings[0].definitions[0].example] : [],
            synonyms: entry.meanings[0].synonyms || []
          })));
        } else {
          setError('No results found.');
        }
      } catch (error) {
        setError('Failed to fetch data. Please try again.');
      }
    } else {
      setError('Please enter a word to search.');
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode); 
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode'; 
  };

  return (
    <div>
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={handleThemeToggle} />
          <span className="slider round"></span>
        </label>
        <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
      <div className="app-content" style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Dictionary App</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a word..."
        />
        <button onClick={handleSearch}>Search</button>

        <label htmlFor="language-select">Select Language:</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">Swahili</option>
          <option value="French">Italian</option>
          <option value="French">Arabic</option>
         
        </select>

        {error && <div className="error">{error}</div>}

        {results.length > 0 && (
          <div className="results-container">
            {results.map((result, index) => (
              <div key={index} className="word-container">
                <div className="meaning-container">
                  <strong>Meaning:</strong> {result.meaning}
                </div>
                {result.examples.length > 0 && (
                  <div className="example-container">
                    <strong>Examples:</strong>
                    {result.examples.map((ex, idx) => (
                      <div key={idx}>{ex}</div>
                    ))}
                  </div>
                )}
                <div className="synonyms-container">
                  <strong>Synonyms:</strong>
                  {result.synonyms.map((syn, idx) => (
                    <span key={idx} style={{ marginRight: '5px' }}>{syn}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;
