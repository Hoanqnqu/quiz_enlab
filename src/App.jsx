import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { path } from './utils/contain';
import { Home, History, Quiz, DetailQuiz, Error } from './pages';
import { DataQuizsProvider } from './store/DataQuizsContext';

function App() {
    return (
        <DataQuizsProvider>
            <div className="flex min-h-screen min-w-screen items-center flex-col px-10 pt-0 ">
                <BrowserRouter className="w-full">
                    <Routes className="max-w-[1200px] m-auto">
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.HISTORY} element={<History />} />
                        <Route path={path.HISTORY_DETAIL} element={<DetailQuiz />} />
                        <Route path={path.QUIZ} element={<Quiz />} />
                        <Route path={path.ERROR} element={<Error />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </DataQuizsProvider>
    );
}

export default App;
