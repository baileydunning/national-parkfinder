import MainNav from './MainNav'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe('MainNav', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <MainNav
          filterButtonsByName={jest.fn()}
          generateRandomParkCode={jest.fn()}
        />
      </Router>
    )
  })

  it('should render a title and image', () => {
    expect(screen.getByAltText('National Parkfinder Logo')).toBeInTheDocument()
    expect(screen.getByText('National Parkfinder')).toBeInTheDocument()
  })

  it('should render a list of park buttons', () => {
    const allButtons = screen.getAllByRole("button")
    
    expect(screen.getByText('Grand Canyon')).toBeInTheDocument()
    expect(allButtons.length).toBe(63)
  })

  it('should be able to filter the list of park buttons based on name match', () => {
    const searchInput = screen.getByPlaceholderText('search by name')
    
    userEvent.type(searchInput, 'grand')
    const allButtons = screen.getAllByRole("button")
    
    expect(allButtons.length).toBe(3)
    expect(screen.getByText('Grand Canyon')).toBeInTheDocument()
  })

  it('should filter park buttons based off state selection', () => {
    const stateDropdown = screen.getByTestId('select-form')
    const minnesota = screen.getByText('Minnesota')
    
    userEvent.selectOptions(stateDropdown, [minnesota])
    const allButtons = screen.getAllByRole("button")
    
    expect(allButtons.length).toBe(2)
    expect(screen.getByText('Voyageurs')).toBeInTheDocument()
  })

  it('should filter park buttons by state and name search', () => {
    const stateDropdown = screen.getByTestId('select-form')
    const colorado = screen.getByText('Colorado')
    const searchInput = screen.getByPlaceholderText('search by name')
    
    userEvent.selectOptions(stateDropdown, [colorado])
    userEvent.type(searchInput, 'rock')
    const allButtons = screen.getAllByRole("button")

    expect(allButtons.length).toBe(2)
    expect(screen.getByText('Rocky Mountain')).toBeInTheDocument()
  })
})

