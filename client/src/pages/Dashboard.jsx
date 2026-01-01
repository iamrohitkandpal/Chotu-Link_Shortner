import { useQuery } from "@apollo/client/react";
import UrlCard from "../components/UrlCard";
import UrlForm from "../components/UrlForm";
import { useAuth } from "../context/AuthContext";
import { MY_URLS_QUERY } from "../graphql/queries";

function Dashboard() {
    const { user, logout } = useAuth();

    const { loading, error, data, refetch } = useQuery(MY_URLS_QUERY, {
        pollInterval: 5000,
        variables: { userId: user?.id }
    });

    if (loading) return <div className="loading">Loading your URLs...</div>
    if (error) return <div className="error">Error: {error.message}</div>

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcom, {user?.name || user?.email}!</h1>
                <button onClick={logout} className="logout-btn">Logout</button>
            </header>

            <UrlForm onSuccess={() => refetch()} />

            <section className="url-list">
                <h2>Your Short URLs ({data?.myUrls?.length || 0})</h2>

                {data?.myUrls?.length === 0 ? (
                    <p>No URLs yet. Create your first short URL above!</p>
                ) : (
                    data?.myUrls?.map((url) => (
                        <UrlCard key={url.id} url={url} onDelete={() => refetch()} />
                    ))
                )}
            </section>
        </div>
    )
}

export default Dashboard;