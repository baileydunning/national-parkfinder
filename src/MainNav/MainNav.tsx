import { useState, useEffect } from 'react'
import './MainNav.scss';
import NavSearch from '../NavSearch/NavSearch'
import ParkList from '../ParkList/ParkList'
import parkfinderLogo from './landscape.png'
import { nationalParks } from '../ParkData'
import ParkBtn from '../ParkBtn/ParkBtn'
import { LocalParkData } from '../interfaces'

interface ChoosePark {
  choosePark: (parkCode: string) => void
}

interface FilterButtonsByName {
  filterButtonsByName: (searchTerm: string) => void
}

interface GenerateRandomParkCode {
  generateRandomParkCode: () => void
}

type NavProps = ChoosePark | LocalParkData | FilterButtonsByName | GenerateRandomParkCode

const MainNav: React.FC<NavProps> = (props) => {
  const { choosePark } = props as ChoosePark
  const { generateRandomParkCode } = props as GenerateRandomParkCode
  const [nameSearch, setNameSearch] = useState<string>('')
  const [parksOnDisplay, setParksOnDisplay] = useState<Array<JSX.Element>>([])

  useEffect(() => {
    if (!nameSearch) {
      createNavBtns(nationalParks)
    }
  }, [nameSearch])

  const createNavBtns = (parks: Array<LocalParkData>): void => {
    const parkButtons = parks.map(park => {
      return <ParkBtn
        key={park.parkCode}
        name={park.name}
        parkCode={park.parkCode}
        choosePark={choosePark}
      />
    })
    setParksOnDisplay(parkButtons)
  }

  const filterButtonsByName = (searchTerm: string) => {
    setNameSearch(searchTerm)
    const filteredParks = nationalParks.filter(park => {
      return park.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    createNavBtns(filteredParks)
  }

  return (
    <nav className='main-nav'>
      <img
        className='logo'
        src={parkfinderLogo}
        alt='National Parkfinder Logo'
      />
      <h1 className='site-header'>National Parkfinder</h1>
      <NavSearch
        filterButtonsByName={filterButtonsByName}
      />
      <ParkList
        generateRandomParkCode={generateRandomParkCode}
        parksOnDisplay={parksOnDisplay}
      />
    </nav>
  )
}

export default MainNav