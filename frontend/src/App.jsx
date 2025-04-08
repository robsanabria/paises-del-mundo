import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const searchCountries = async () => {
      setError('')
      if (searchQuery.trim().length < 2) {
        setCountries([])
        return
      }

      setLoading(true)
      try {
        const response = await axios.get(`/api/search?q=${searchQuery}`)
        console.log('API Response:', response)
        
        if (response && response.data && Array.isArray(response.data.results)) {
          setCountries(response.data.results)
          if (response.data.results.length === 0) {
            setError('No se encontraron países que coincidan.')
          }
        } else {
          console.error('Unexpected API response structure:', response)
          setError('Error: Respuesta inesperada del servidor.')
          setCountries([])
        }
      } catch (err) {
        console.error('Error searching countries:', err)
        setError('Error al buscar países. Intenta de nuevo.')
        setCountries([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      searchCountries()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Búsqueda de Países
        </h1>
        
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o región (mín. 2 caracteres)..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          
          {loading && (
            <div className="absolute right-3 top-3.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        <div className="text-center text-gray-600 mb-6 h-5">
          {searchQuery.length >= 2 && !loading && countries.length > 0 && (
            <span>{countries.length} resultado(s) encontrado(s).</span>
          )}
          {searchQuery.length < 2 && !loading && !error && (
            <span>Ingresa al menos 2 caracteres para buscar.</span>
          )}
          {error && (
            <span className="text-red-500">{error}</span>
          )}
        </div>

        <div className="space-y-4">
          {countries.map((country, index) => (
            country && (
              <div
                key={`${country.Country || index}-${index}`}
                className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{country.Country || 'Nombre no disponible'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div>
                    <p><span className="font-medium text-gray-800">Región:</span> {country.Region || 'N/A'}</p>
                    <p><span className="font-medium text-gray-800">Población:</span> {country.Population?.toLocaleString() || 'N/A'}</p>
                    <p><span className="font-medium text-gray-800">Área (sq. mi.):</span> {country["Area (sq. mi.)"]?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <p><span className="font-medium text-gray-800">Densidad Pob. (por sq. mi.):</span> {country["Pop. Density (per sq. mi.)"]?.toLocaleString() || 'N/A'}</p>
                    <p><span className="font-medium text-gray-800">Mortalidad Infantil:</span> {country["Infant mortality (per 1000 births)"]?.toLocaleString() || 'N/A'}</p>
                    <p><span className="font-medium text-gray-800">PIB ($ per capita):</span> ${country["GDP ($ per capita)"]?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <p><span className="font-medium text-gray-800">Alfabetización (%):</span> {country["Literacy (%)"]?.toLocaleString() || 'N/A'}</p>
                    <p><span className="font-medium text-gray-800">Teléfonos (por 1000):</span> {country["Phones (per 1000)"]?.toLocaleString() || 'N/A'}</p>
                    <p><span className="font-medium text-gray-800">Tasa Natalidad:</span> {country.Birthrate?.toLocaleString() || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
