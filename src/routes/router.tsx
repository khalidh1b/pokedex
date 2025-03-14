import { Main } from '@/components/main/main';
import { PokemonNotFound } from '@/components/pokemon-not-found/pokemon-not-found';
import { Layout } from '@/layout/layout';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Main/>
            },
            {
                path: '/pokemon-not-found',
                element: <PokemonNotFound/>
            }
        ]
    }
]);