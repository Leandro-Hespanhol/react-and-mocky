import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks'
describe('Test Rick & Morty API', () => {
  beforeEach( ()=>{
    global.fetch = async (url) => ({ json: async () => responseAPI })
    render(<App/>)
  })
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const title = screen.getByRole('heading', {
      name: /rick sanchez/i,
      level: 3
    });
    expect(title).toBeDefined();
  })
  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /buscar/i
    });
    expect(input).toBeDefined();
    expect(button).toBeDefined();
  })
  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /buscar/i
    });
    userEvent.type(input, 'Smith');
    userEvent.click(button);
    const cards = screen.getAllByRole('heading', {
      level: 3,
    })
    expect(cards).toHaveLength(4);
  })
})