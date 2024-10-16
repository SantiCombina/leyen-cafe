import {Route, Routes} from "react-router-dom";

import {Home} from "./views/home";
import {Login} from "./views/login";
import {NotFound} from "./views/not-found";
import {ProtectedRoute} from "./components/protected-routes";

function App() {
    return (
        <div className="min-h-[100dvh] flex flex-col justify-center items-center p-6">
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<Home />} path="/" />
                </Route>
                <Route element={<Login />} path="/login" />
                <Route element={<NotFound />} path="*" />
            </Routes>
        </div>
    );
}

export default App;
