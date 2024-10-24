import {Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";

import {Card} from "./views/card";
import {Login} from "./views/login";
import {NotFound} from "./views/not-found";
import {ProtectedRoute} from "./components/protected-routes";
import {Layout} from "./components/layout/layout";
import {Home} from "./views/home";

function App() {
    return (
        <>
            <Toaster richColors />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<Layout />}>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Card />} path="/card" />
                    </Route>
                    <Route element={<NotFound />} path="*" />
                </Route>
            </Routes>
        </>
    );
}

export default App;
