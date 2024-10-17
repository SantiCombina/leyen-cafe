import {Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";

import {Home} from "./views/home";
import {Login} from "./views/login";
import {NotFound} from "./views/not-found";
import {ProtectedRoute} from "./components/protected-routes";
import {Layout} from "./components/layout/layout";

function App() {
    return (
        <>
            <Toaster richColors />
            <Routes>
                <Route element={<Login />} path="/login" />
                <Route element={<Layout />}>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Home />} path="/" />
                    </Route>
                    <Route element={<NotFound />} path="*" />
                </Route>
            </Routes>
        </>
    );
}

export default App;
