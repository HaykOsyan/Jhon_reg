import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '..';
import Home from '../pages/Home';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {

    const { user } = useContext(Context);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<h1>Standart Page</h1>} />
        </Routes>
    );
});


export default AppRouter;