import {useMutation} from "@apollo/client/react"
import { DELETE_URL_MUTATION } from "../graphql/mutations"

function UrlCard({ url, onDelete }) {
    const [deleteUrl, { loading }] = useMutation(DELETE_URL_MUTATION);

    const shortUrl = `http://localhost:3333/${url.shortCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        alert('Copied to Clipboard!');
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this URL?')) return;

        try {
            await deleteUrl({ variables: { urlId: url.id } });
            onDelete();
        } catch (err) {
            alert('Dailed to delete: ' + err.message);
        }
    };

    return (
        <div className="url-card">
            <div className="url-info">
                <p className="short-url">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </p>
                <p className="original-url">{url.originalUrl}</p>
                <p className="stats">
                    {url.clickCount} clicks |
                    {new Date(url.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="url-actions">
                <button onClick={handleCopy} className="copy-btn">
                    Copy
                </button>
                <button onClick={handleDelete} disabled={loading} className="delete-btn">
                    {loading ? '...' : 'Delete'}
                </button>
            </div>
        </div>
    )

}

export default UrlCard