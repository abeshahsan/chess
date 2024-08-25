import { useUserContext } from "../Contexts/UserContext";
import PageLoading from "../Components/ErrorsAndPlaceHolders/PageLoading";
import Index from "./Index.jsx";

export default function Layout() {
    let { fetchingUser } = useUserContext();

    return <>{fetchingUser ? <PageLoading /> : <Index />}</>;
}
