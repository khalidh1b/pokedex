import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router.tsx';
import { PokemonProvider } from '@/context/pokemonContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const newClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokemonProvider>
      <QueryClientProvider client={newClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </PokemonProvider>
  </StrictMode>,
)
