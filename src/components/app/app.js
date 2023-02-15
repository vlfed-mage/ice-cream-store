import React, {useEffect} from 'react';

import Header from '../structure/header';
import Footer from '../structure/footer';
import Main from '../structure/main';

import services from '../../services';

const App = () => {
    const { getData } = services();

    useEffect(() => {
        getData('menu', '1')
            .then((data) => console.log(data))
    }, [])

    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};

export default App;