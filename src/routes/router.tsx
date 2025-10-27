import { Main } from '@/components/main/main';
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
            }
        ]
    }
]);