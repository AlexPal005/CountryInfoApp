import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Link, useParams } from 'react-router'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import './country.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type BorderCountry = {
  commonName: string
  officialName: string
  region: string
  countryCode: string
}
type FlagType = {
  flag: string
  name: string
}
type PopulationType = {
  country: string
  populationCounts: { year: number; value: number }[]
}
type CountryInfoType = {
  borderCountries: BorderCountry[]
  flagData: FlagType
  populationData: PopulationType
}
export const Country = () => {
  const { countryCode } = useParams()
  const [country, setCountry] = useState<CountryInfoType | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`http://localhost:3001/api/CountryInfo/${countryCode}`)
      .then(res => {
        setCountry(res.data)
        setErr('')
      })
      .catch(err => {
        console.log(err)
        setErr('Error loading country information!')
      })
      .finally(() => setIsLoading(false))
  }, [countryCode])

  useEffect(() => {
    console.log(country)
  }, [country])

  const populationChartData = country?.populationData?.populationCounts
    ? {
        labels: country.populationData.populationCounts.map(data => data.year),
        datasets: [
          {
            label: 'Population',
            data: country.populationData.populationCounts.map(data => data.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
          }
        ]
      }
    : { labels: [], datasets: [] }

  return (
    <div className="country-info">
      {isLoading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          {country && (
            <div className="country-info__block">
              <h1 className="country-info__name">{country.flagData.name}</h1>
              <img
                src={country.flagData.flag}
                alt={`Flag of ${country.flagData.name}`}
                className="country-info__flag"
              />
              <div className="country-info__borders">
                <span className="country-info__borders-title">Boarders</span>
                <ul className="country-info__borders-list">
                  {country.borderCountries.map(borderCountry => {
                    return (
                      <li key={borderCountry.countryCode} className="country-info__border-item">
                        <Link to={`/country/${borderCountry.countryCode}`} className="country-info__border-link">
                          {borderCountry.officialName}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="country-info__population">
                <h2 className="country-info__population-title">Population Over Time</h2>
                <Line data={populationChartData} className="country-info__population-chart" />
              </div>
            </div>
          )}
        </>
      )}

      {err && <span className="error">{err}</span>}
    </div>
  )
}
