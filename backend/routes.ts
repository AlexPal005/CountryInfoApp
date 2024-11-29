import { Router } from 'express'
import axios from 'axios'

export const router = Router()

router.get('/AvailableCountries', async (req, res) => {
  try {
    const availableCountriesRes = await axios.get('https://date.nager.at/api/v3/AvailableCountries')
    res.status(200).json(availableCountriesRes.data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch a list of countries' })
  }
})

router.get('/CountryInfo/:countryCode', async (req, res) => {
  const { countryCode } = req.params

  try {
    //get a List of Border Countries
    const borderCountriesRes = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
    const borderCountries = borderCountriesRes.data.borders || []

    const countryName = borderCountriesRes.data.commonName

    //get a population data
    const populationDataRes = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
      country: countryName
    })

    //get flag images
    const flagRes = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
      country: countryName
    })

    res.status(200).json({
      borderCountries,
      populationData: populationDataRes.data.data,
      flagData: flagRes.data.data
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch country information' })
  }
})

export default router
