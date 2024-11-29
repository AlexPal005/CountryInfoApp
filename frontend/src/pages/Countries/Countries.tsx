import { useEffect, useState } from 'react'
import './countries.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

type Country = {
  countryCode: string
  name: string
}
export const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('http://localhost:3001/api/AvailableCountries')
      .then(res => {
        setCountries(res.data)
        setErr('')
      })
      .catch(err => {
        console.log(err)
        setErr('Error loading countries!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="countries">
      {isLoading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          {countries ? (
            <>
              {countries.map(country => {
                return (
                  <div key={country.countryCode} className="countries__item">
                    <Link to={`/country/${country.countryCode}`} className="countries__link">
                      {country.name}
                    </Link>
                  </div>
                )
              })}
            </>
          ) : (
            <span className="countries__empty">The list is empty</span>
          )}
        </>
      )}
      {err && <span className="error">{err}</span>}
    </div>
  )
}
